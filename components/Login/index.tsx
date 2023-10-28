import React from "react";

interface Iprops {
    isShow: boolean;
    onClose: Function;
}

const Login = (props: Iprops) => {
    const {
        isShow,
        // onClose 
    } = props;
    console.log(isShow,'isShow')
    return (
        isShow ? (<div>denglu</div>) : null
    )
}

export default Login;