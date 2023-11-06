import { NextApiRequest, NextApiResponse } from "next";
import {withIronSessionApiRoute} from 'iron-session/next';
import {ironOption} from '../../../config/index';
import {prepareConnection} from '../../../db/index'
import {User, UserAuth} from '../../../db/entity/index'
import {ISession } from '../index'
import {Cookie} from "next-cookie"
import {setCookie} from '../../../utils/index'

export default withIronSessionApiRoute(login,ironOption);

async function login(req: NextApiRequest, res: NextApiResponse) {
    const cookies = Cookie.fromApiRoute(req, res);
    const session: ISession = req.session;
    const {phone ='', verify = '', identity_type="phone"} = req.body;
    //连接数据库
    const db = await prepareConnection();
    const userAuthRepo = db.getRepository(UserAuth);
    const userRepo = db.getRepository(User);
    const users = await userAuthRepo.find()
    //判断前端与服务器的session是否一致
    if(String(session.verifyCode) === String(verify)){
        const userAuth = await userAuthRepo.findOne({
            identity_type,
            identifier: phone
        },{
            relations: ['user']
        })
        if(userAuth){
            //已存在的用户
            const user = userAuth.user;
            const {id, nickname, avatar} = user;
            //设置session
            session.userId = id;
            session.nickname = nickname;
            session.avatar = avatar;
            await session.save()
            //设置cookie
            setCookie(cookies, { id, nickname, avatar })
            res.status(200).json({
                msg: '登录成功',
                data: {
                    userId: id,
                    nickname,
                    avatar,
                },
                code: 0
            })
        } else {
            //新用户，自动注册
            const user = new User();
            user.nickname = '用户_1',
            user.avatar = '/images/avatar.jpg',
            user.job='暂无',
            user.introduce="暂无"
    
            const userAuths= new UserAuth();
            userAuths.identifier = phone,
            userAuths.identity_type = identity_type,
            userAuths.credential = session.verifyCode,
            userAuths.user = user
    
            const resUserAuth = await userAuthRepo.save(userAuths);
            const {
                user: {id, nickname, avatar}
            } = resUserAuth;
            //保存在session
            session.userId = id;
            session.nickname = nickname;
            session.avatar = avatar;
            await session.save()
            //保存在cookie
            setCookie(cookies, { id, nickname, avatar })
            res.status(200).json({
                msg: '登录成功',
                data: {
                    userId: id,
                    nickname,
                    avatar,
                },
                code: 0
            })
    
        }
    }else {
        res.status(200).json({
            msg: '验证码错误',
            code: -1,
        })
    }
}

