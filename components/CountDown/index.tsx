import React, {useEffect, useState} from 'react';
import style from './index.module.scss'

interface Iprops {
    time: number;
    onEnd: Function;
}

const CountDown = (props: Iprops) =>{
    const {time, onEnd} = props;

    const [count,setCount] = useState(time || 60)

    useEffect(()=>{
        const id = setInterval(()=>{
            setCount((count) => {
                if(count === 0){
                    clearInterval(id);
                    onEnd && onEnd();
                    return 0;
                }
                return count-1;
            })
        },1000)
        return () => {
            clearInterval(id);
        }
    }, [time, onEnd]);

    return (
        <div className={style.count}>{count}</div>
    )
}

export default CountDown;