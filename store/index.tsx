import React, {ReactElement, createContext, useContext} from 'react';
import {useLocalObservable, enableStaticRendering} from 'mobx-react-lite';
import createStore,{Istore} from './rootStore';

const StoreContext = createContext({});

interface IProps {
    initialValue: Record<any, any>,
    children: ReactElement
}

enableStaticRendering(true)

export const StoreProvider = ({initialValue, children}: IProps ) => {
    const store: Istore = useLocalObservable(createStore(initialValue))
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

export const useStore = () => {
    const store: Istore = useContext(StoreContext) as Istore;
    if(!store){
        throw new Error("数据不存在")
    }
    return store;
}