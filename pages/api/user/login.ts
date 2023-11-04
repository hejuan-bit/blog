import { NextApiRequest, NextApiResponse } from "next";
import {withIronSessionApiRoute} from 'iron-session/next';
import {ironOption} from '../../../config/index';
import {prepareConnection} from '../../../db/index'
import {User, UserAuth} from '../../../db/entity/index'
import {ISession } from '../index'

export default withIronSessionApiRoute(login,ironOption);

async function login(req: NextApiRequest, res: NextApiResponse) {
    const session: ISession = req.session;
    const {phone ='', verify = '', identity_type="phone"} = req.body;
    //连接数据库
    const db = await prepareConnection();
    const userAuthRepo = db.getRepository(UserAuth);
    const userRepo = db.getRepository(User);
    const users = await userRepo.find()
    console.log(users) 
    //判断前端与服务器的session是否一致
    console.log(session,String(session.verifyCode),String(verify),'3333')
    if(String(session.verifyCode) === String(verify)){
        const userAuth = await userAuthRepo.findOne({
            identity_type,
            identifier: phone
        },{
            relations: ['user']
        })
        if(userAuth){
            //已存在的用户
            console.log('555')
        } else {
            console.log('666')
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
            console.log(resUserAuth,'666')
    
        }
    }
   
    res.status(200).json({
        phone,
        verify,
        code: 0
    })
}

