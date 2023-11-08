import Link from 'next/link';
import style from './index.module.scss'
import {EyeOutlined} from '@ant-design/icons'
import {Avatar} from 'antd'
import {formatDistanceToNow} from 'date-fns'
import {markdownToTxt} from 'markdown-to-txt'

const ListItem = (props: any) => {
    const {article} = props;
    const {user} = article
    return(
        <Link href={`/article/${article.id}`}>
            <div className={style.container}>
                <div className={style.article}>
                    <div className={style.userInfo}>
                        <span className={style.name}>{user.nickname}</span>
                        <span className={style.date}>{formatDistanceToNow(new Date(article.update_time))}</span>
                    </div>
                <h4 className={style.title}>{article?.title}</h4>
                <p className={style.content}>{markdownToTxt(article?.content)}</p>
                <div className={style.statics}>
                    <EyeOutlined />
                    <span style={{marginLeft: '5px'}}>{article.views}</span>
                </div>
                </div>
                <Avatar src={user?.avatar} size={48} />
            </div>
        </Link>
    )
}

export default ListItem