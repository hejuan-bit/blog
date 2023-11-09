import { NextApiRequest, NextApiResponse } from "next";
import {withIronSessionApiRoute} from 'iron-session/next';
import {ironOption} from '../../../config/index';
import {prepareConnection} from '../../../db/index'
import {Tag} from '../../../db/entity/index'
import {ISession } from '../index'
import {EXCEPTION_ARTICLE} from '../config/codes'

export default withIronSessionApiRoute(get,ironOption);

async function get(req: NextApiRequest, res: NextApiResponse) {
    const session: ISession = req.session;
    const {title = '', content = ''} = req.body
    const db = await prepareConnection();
    const userRepo = db.getRepository(User)
    const articleRepo = db.getRepository(Article)

    const user = await userRepo.findOne({
        id: session.userId
    })

    const article = new Article();
    article.title = title;
    article.content = content;
    article.create_time = new Date();
    article.update_time = new Date();
    article.is_delete = 0;
    article.views = 0;

    if(user){
        article.user = user;
    }

    const resArticle = await articleRepo.save(article)

    if(resArticle) {
        res.status(200).json({data: resArticle, code: 0, msg: '发布成功'})
    } else {
        res.status(200).json({...EXCEPTION_ARTICLE.PUBLISH_FAILED})
    }

}