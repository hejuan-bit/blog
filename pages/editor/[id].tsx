import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import style from './index.module.scss'
import {Input, Button, message} from 'antd'
import request from '../../service/fetch'
import {useStore} from '../../store/index';
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/router'
import {prepareConnection} from '../../db/index';
import { Article } from "../../db/entity/index";


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export async function getServerSideProps({params}: any){
    const articleId = params?.id;
    console.log(articleId,'articleId')
    const db = await prepareConnection();
    const articleRepo = db.getRepository(Article);
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


const ModifyEditor = ({ articles}: any) => {
    const store = useStore();
    const {push,query} = useRouter()
    const articleId = Number(query?.id)
    const {userId} = store.user.userInfo;
    const [content, setContent] = useState(articles?.content || '');
    const [title, setTitle] = useState(articles?.title || '')

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event?.target?.value)
    }

    const handleContent = (content: any) => {
      setContent(content)
    }

    const handlePublish = () => {
      if(!title) {
        message.warning('请输入文章标题');
      }else {
        request.post('/api/article/update', {
          title,
          content,
          id: articleId
        }).then((res: any) => {
          if(res.code === 0) {
            message.success('更新成功')
            articleId ? push(`/article/${articleId}`) : push(`/`)
          }else {
            message.error(res?.msg || '更新失败')
          }
        })
      }
    }

    return (
      <div className={style.container}>
        <div className={style.operation}>
            <Input className={style.title} placeholder="请输入文章标题" value={title} onChange={handleTitleChange}/>
            <Button className={style.button} type="primary" onClick={handlePublish}>发布</Button>
        </div>
        <MDEditor value={content} onChange={handleContent} height={1080} />
      </div>
    );
}

ModifyEditor.layout = null;

export default observer(ModifyEditor);