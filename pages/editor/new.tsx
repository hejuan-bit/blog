import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import style from './index.module.scss'
import {Input, Button, message} from 'antd'
import request from '../../service/fetch'
import {useStore} from '../../store/index';
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/router'


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);


const NewEditor = () => {
    const store = useStore();
    const {push} = useRouter()
    const {userId} = store.user.userInfo;
    const [content, setContent] = useState("");
    const [title, setTitle] = useState('')

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
        request.post('/api/article/publish', {
          title,
          content
        }).then((res: any) => {
          if(res.code === 0) {
            message.success('发布成功')
            userId ? push(`/user/${userId}`) : push(`/`)
          }else {
            message.error(res?.msg || '发布失败')
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

NewEditor.layout = null;

export default observer(NewEditor);