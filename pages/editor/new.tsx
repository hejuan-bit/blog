import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import style from './index.module.scss'
import {Input, Button} from 'antd'

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

const handlePublish = () => {

}

const NewEditor = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState('')

    const handleTitleChange = (event: any) => {
        setTitle(event?.target?.value)
    }

    return (
      <div className={style.container}>
        <div className={style.operation}>
            <Input className={style.title} placeholder="请输入文章标题" value={title} onChange={handleTitleChange}/>
            <Button className={style.button} type="primary" onClick={handlePublish}>发布</Button>
        </div>
        <MDEditor value={content} onChange={setContent} height={1080} />
      </div>
    );
}

NewEditor.layout = null;

export default NewEditor;