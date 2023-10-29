import { format } from "date-fns";
import md5 from 'md5';
import {encode} from 'js-base64';
import { NextApiRequest, NextApiResponse } from "next";
import request from '../../../service/fetch';
import {withIronSessionApiRoute} from 'iron-session/next';

export default withIronSessionApiRoute(sendVerifyCode,{

})
async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
    const {to='', templateId ='1'} = req.body;
    const AccountId = '2c94811c8b1e335b018b76e90a2b156b';
    const AuthToken = 'e98c9ed303a54644a6a0a28533ef564d';
    const NowDate = format(new Date(), 'yyyyMMddHHmmss');
    const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);
    const Authorization = encode(`${AccountId}:${NowDate}`);
    const AppId = `2c94811c8b1e335b018b76e90bbf1572`;
    const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;
    const verifyCode = Math.floor(Math.random() * (9999-1000)) + 1000;
    const expireTime = 5;

    const reponse = await request.post(url,{
        to,
        templateId,
        appId: AppId,
        datas: [verifyCode, expireTime]
    },{
        headers: {
            Authorization: Authorization,
        }
    });
}