export const  ironOption = {
    // cookieName: process.env.SESSION_COOKIE_NAME as string,
    // password: process.env.SESSION_PASSWORD as string,
    // cookieOptions: {
    //     maxAge: 24*60*60*1000,
    //     secure: process.env.NODE_ENV === 'production'
    // }
    cookieName: "sid",
    password: "h8gANaTJe4VSTy0L7JiAgCDDrVUGz2Rs",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }


