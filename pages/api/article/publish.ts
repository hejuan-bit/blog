import { NextApiRequest, NextApiResponse } from "next";
import {withIronSessionApiRoute} from 'iron-session/next';
import {ironOption} from '../../../config/index';
import {prepareConnection} from '../../../db/index'
import {User, UserAuth} from '../../../db/entity/index'
import {ISession } from '../index'
import {Cookie} from "next-cookie"
import {setCookie} from '../../../utils/index'

export default withIronSessionApiRoute(publish,ironOption);

async function publish(req: NextApiRequest, res: NextApiResponse) {
    const session: ISession = req.session;
    const {title = '', content = ''} = req.body
    const db = await prepareConnection();
    const userRepo = await db.getRepository(User)
    const articleRepo = await db.getRepository(User)
}