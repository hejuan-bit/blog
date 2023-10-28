import React, {useState} from "react";
import { navs } from "./config";
import Link from 'next/link';
import {useRouter} from 'next/router'
import style  from "./index.module.scss";
import {Button} from 'antd';
import Login from '../Login'

const Navbar = () => {
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
                <Button type='primary' onClick={handleLogin}>登录</Button>
            </section>
            <Login isShow={isShowLogin} onClose={handleClose}/>
        </div>
    )
}

export default Navbar;