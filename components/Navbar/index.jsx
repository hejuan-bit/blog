import React, {useState} from "react";
import { navs } from "./config";
import Link from 'next/link';
import {useRouter} from 'next/router'
import style  from "./index.module.scss";
import {Button, Avatar, Dropdown, Menu} from 'antd';
import Login from '../Login'
import {useStore} from '../../store/index';
import { LoginOutlined, HomeOutlined } from "@ant-design/icons";


const Navbar = () => {
    const store = useStore();
    const {userId, avatar} = store.user.userInfo;
    const {pathname} = useRouter();
    const [isShowLogin, setIsShowLogin] = useState(false)
    const handleGotoEditorPage = () => {
    }
    const handleLogin = () => {
        setIsShowLogin(true)
    }
    const handleClose = () => {
        setIsShowLogin(false)
    }

    const renderDropMenu = () => {
        return (
            <Menu>
                <Menu.Item><HomeOutlined />&nbsp;个人主页</Menu.Item>
                <Menu.Item><LoginOutlined />&nbsp;退出</Menu.Item>
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

export default Navbar;