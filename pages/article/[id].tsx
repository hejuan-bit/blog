import React  from "react";
import {prepareConnection} from '../../db/index';
import { Article } from "../../db/entity/index";
import style from './index.module.scss'
import { Avatar } from "antd";
import {useStore} from '../../store/index';
import {observer} from 'mobx-react-lite'
import userStore from "@/store/userSrore";
import Link from 'next/link'
import Markdown  from "markdown-to-jsx";
import {format} from 'date-fns'


interface IArticle {

}

interface IProps {
  articles: IArticle
}

export async function getServerSideProps({params}){
    const articleId = params?.id;
    console.log(articleId,'articleId')
    const db = await prepareConnection();
    const article = await db.getRepository(Article).findOne({
        where: {
            id: articleId,
        },
        relations: ['user']
    })
    return {
        props: {
            articles: JSON.parse(JSON.stringify(article))
        }
    }
}

const ArticleDetail = (props) => {
    const {articles} = props;
    console.log(articles,'0000000')
    const {user: {nickname, avatar, id}} = articles;
    const store = useStore()
    const loginUserInfo = store?.user?.userInfo;
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
        </div>
    )
}

export default observer(ArticleDetail)