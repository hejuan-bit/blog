import React, { ChangeEvent } from "react";
import style from './index.module.scss';
import {useState} from "react";
import CountDown from '../CountDown';

interface Iprops {
    isShow: boolean;
    onClose: Function;
}

const Login = (props: Iprops) => {
    const {
        isShow,
        onClose 
    } = props;

    const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
    const [form, setForm] = useState({
        phone: '',
        verify: ''
    })

    const handleClose = () => {
        onClose()
    }

    const getVerifyCode = () => {
        setIsShowVerifyCode(true)
    }

    const handleLogin = () => {

    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e?.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleOtherLogin = () => {

    }

    const handleCountDownEnd = () => {
        setIsShowVerifyCode(false);
    }

    return (
        isShow ? (
        <div className={style.loginArea}>
            <div className={style.loginBox}> 
                <div className={style.loginTitle}>
                    <div>手机登录页</div>
                    <div className={style.close} onClick={handleClose}>X</div>
                </div>
                <input type="text" name="phone" placeholder="请输入手机号" value={form.phone}/>
                <div className={style.verifycodeArea}>
                    <input type="text" name="verify" placeholder="请输入验证码" value={form.verify} onChange={handleFormChange}/>
                    <span className={style.verifyCode} onClick={getVerifyCode}>
                        {isShowVerifyCode ? <CountDown time={10} onEnd={handleCountDownEnd}/> : "获取验证码"}
                    </span>
                </div>
                <div className={style.loginBtn} onClick={handleLogin} onChange={handleFormChange}>登录</div>
                <div className={style.otherLogin} onClick={handleOtherLogin}>使用Githab登录</div>
                <div className={style.loginPrivacy}>
                    注册登录即表示同意
                    <a href='' target="_blank">隐私政策</a>
                </div>
            </div>
        </div>
        ) : null
    )
}

export default Login;