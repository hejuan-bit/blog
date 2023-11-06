interface ICookieInfo {
    id: number;
    nickname: string;
    avatar: string;
}

export const setCookie = (
    cookies: any, 
    {id, nickname, avatar}: ICookieInfo
    ) => {
    const expire = new Date(Date.now() + 24* 60* 60*1000);
    const path = '/';

    cookies.set("userId", id, {
        path,
        expire
    });
    cookies.set("nickname", nickname, {
        path,
        expire
    });
    cookies.set("avatar", avatar, {
        path,
        expire
    });
}