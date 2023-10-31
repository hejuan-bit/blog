import { NextApiRequest, NextApiResponse } from "next";
import request from '../../../service/fetch';
import {withIronSessionApiRoute} from 'iron-session/next';
import {ironOption} from '../../../config/index';

export default withIronSessionApiRoute(login,ironOption);

async function login(req: NextApiRequest, res: NextApiResponse) {
    const {phone ='', verify = ''} = req.body;
    res.status(200).json({
        phone,
        verify
    })
}