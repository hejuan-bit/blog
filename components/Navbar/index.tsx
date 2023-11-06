import React, {useState} from "react";
import { navs } from "./config";
import Link from 'next/link';
import {useRouter} from 'next/router'
import style  from "./index.module.scss";
import {Button, Avatar, Dropdown, Menu, message} from 'antd';
import Login from '../Login'
import {useStore} from '../../store/index';
import { LoginOutlined, HomeOutlined } from "@ant-design/icons";
import request from '../../service/fetch';
import {observer} from 'mobx-react-lite'


const Navbar = () => {
    const store = useStore();
    const {userId, avatar} = store.user.userInfo;
    const {pathname, push} = useRouter();
    const [isShowLogin, setIsShowLogin] = useState(false)

    const handleGotoEditorPage = () => {
        if(userId){
            push('/editor/new')
        } else {
            message.warning('请先登录')
        }
    }
    const handleLogin = () => {
        setIsShowLogin(true)
    }
    const handleClose = () => {
        setIsShowLogin(false)
    }

    const handleLoginOut = () => {
        request.post('/api/user/logout').then((res: any) => {
            if(res.code === 0) {
                store.user.setUserInfo({})
            }
        })
    }

    const handleGotoPersonalPage = () => {
       push(`/user/${userId}`);
    }

    const renderDropMenu = () => {
        return (
            <Menu>
                <Menu.Item onClick={handleGotoPersonalPage}><HomeOutlined />&nbsp;个人主页</Menu.Item>
                <Menu.Item onClick={handleLoginOut}><LoginOutlined />&nbsp;退出</Menu.Item>
            </Menu>
        )
    }

    return (
        <div className={style.navbar}>
            <section className={style.logArea}>BLOG-C</section>
            <section>
                <ul className={style.linkwrap}>
                    {
                        navs?.map(nav => {
                            return(
                                <li key={nav.label} className={style.linkArea}>
                                    <Link 
                                        href={nav?.value}
                                    >
                                        <a className={pathname == nav?.value ? style.active : style.default}>{nav.label}</a>
                                    </Link>
                                </li>
                               
                            )
                        })
                    }
                </ul>
            </section>
            <section className={style.operationArea}>
                <Button onClick={handleGotoEditorPage}>写文章</Button>
                { userId ? (
                        <>
                            <Dropdown overlay={renderDropMenu()} placement="bottomLeft">
                                <Avatar src={avatar} size={32}></Avatar>
                            </Dropdown>
                        </>
                    ) : (
                        <Button type='primary' onClick={handleLogin}>登录</Button>
                    )
                }
                
            </section>
            <Login isShow={isShowLogin} onClose={handleClose}/>
        </div>
    )
}

export default observer(Navbar);