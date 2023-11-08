import React, {useState}  from "react";
import {prepareConnection} from '../../db/index';
import { Article } from "../../db/entity/index";
import style from './index.module.scss'
import { Avatar, Input, Button, message, Divider } from "antd";
import {useStore} from '../../store/index';
import {observer} from 'mobx-react-lite'
import userStore from "@/store/userSrore";
import Link from 'next/link'
import Markdown  from "markdown-to-jsx";
import {format} from 'date-fns'
import request from '../../service/fetch'


interface IArticle {

}

interface IProps {
  articles: IArticle
}

export async function getServerSideProps({params}){
    const articleId = params?.id;
    console.log(articleId,'articleId')
    const db = await prepareConnection();
    const articleRepo = db.getRepository(Article);
    const article = await db.getRepository(Article).findOne({
        where: {
            id: articleId,
        },
        relations: ['user', 'comments', 'comments.user']
    })
    if(article){
        article.views = Number(article.views) + 1;
        await articleRepo.save(article)
    }
    return {
        props: {
            articles: JSON.parse(JSON.stringify(article))
        }
    }
}

const ArticleDetail = (props) => {
    const {articles} = props;
    console.log(articles,'0000000')
    const {user: {nickname, avatar, id}, comments} = articles;
    const store = useStore()
    const loginUserInfo = store?.user?.userInfo;
    const [inputVal, setInputVal] = useState('')

    const handleChange = (event) => {
        setInputVal(event?.target?.value)
    }

    const handleComment = () => {
        request.post(`/api/comment/publish`,{
            articleId: articles?.id,
            content: inputVal

        }).then((res:any) => {
            if(res?.code === 0 ){
                message.success('发表成功')
                setInputVal('');
            }else{
                message.error('发表失败')
            }
        })
    }

    return (
        <div>
            <div className="content-layout">
                <h2 className={style.title}>{articles.title}</h2>
                <div className={style.user}>
                    <Avatar src={avatar} size={50}/>
                    <div className={style.info}>
                        <div className={style.name}>{nickname}</div>
                        <div className={style.date}>
                            <div>{format(new Date(articles?.update_time), 'yyyy-MM-dd hh:mm:ss')}</div>
                            <div>阅读{articles?.views}</div>
                            {
                                Number(loginUserInfo?.userId) === Number(id) && (
                                    <Link href={`/editor/${articles?.id}`}>编辑</Link>
                                )
                            }
                        </div>
                    </div>
                </div>
                <Markdown className={style.markdown}>{articles?.content}</Markdown>
            </div>
            <div className={style.divider}></div>
            <div className="content-layout">
                <div className={style.comment}>
                    <h3>评论</h3>
                    {
                        loginUserInfo?.userId && (
                            <div className={style.enter}>
                                <Avatar src={avatar} size={40} />
                                <div className={style.content}>
                                    <Input.TextArea placeholder="请输入评论" rows={4} value={inputVal} onChange={handleChange}/>
                                    <Button type="primary" onClick={handleComment}>发表评论</Button>
                                </div>
                            </div>
                        )
                    }
                    <Divider />
                    <div className={style.display}>{
                        comments?.map((comment: any) =>{
                            return (
                                <div className={style.wrapper} key={comment?.id}>
                                    <Avatar src={comment?.user?.avatar} size={40}/>
                                    <div className={style.info}>
                                        <div className={style.name}>
                                            <div>{comment?.user?.nickname}</div>
                                            <div className={style.date}>
                                                {format(new Date(comment?.update_time), 'yyyy-MM-dd hh:mm:ss')}
                                            </div>
                                        </div>
                                        <div className={style.content}>{comment?.content}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(ArticleDetail)