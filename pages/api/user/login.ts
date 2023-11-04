import { NextApiRequest, NextApiResponse } from "next";
import request from '../../../service/fetch';
import {withIronSessionApiRoute} from 'iron-session/next';
import {ironOption} from '../../../config/index';
import {prepareConnection} from '../../../db/index'
import {User} from '../../../db/entity/index'

export default withIronSessionApiRoute(login,ironOption);

async function login(req: NextApiRequest, res: NextApiResponse) {
    const {phone ='', verify = ''} = req.body;
    const db = await prepareConnection();

        const UserRepo = db.getRepository(User);
        UserRepo.find()
    
        console.log(UserRepo.find(),'44447999')
    
    
    res.status(200).json({
        phone,
        verify
    })
}