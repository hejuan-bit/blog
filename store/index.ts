import React, {ReactElement, createContext} from 'react';

const StoreContext = createContext({});

interface IProps {
    initialValue: Record<any, any>,
    children: ReactElement
}

export const StoreProvider = ({initialValue, children}: IProps ) => {
    return (
        <StoreContext.Provider value={}>{children}</StoreContext.Provider>
    )
}