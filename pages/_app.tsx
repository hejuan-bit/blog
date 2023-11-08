import type {AppProps} from 'next/app';
import React from 'react';
import Layout from '../components/layout';
import '../styles/globals.css';
import {StoreProvider} from '../store';
import { NextPage } from 'next';

interface IProps {
    initialValue: Record<any, any>;
    Component: NextPage;
    pageProps: any;
}

function MyApp({initialValue,Component, pageProps}: IProps) {
    const renderLayout = () => {
        if((Component as any).layout === null){
            return <Component {...pageProps}/>
        } else {
            return (
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            )
        }
    }
    return (
        <StoreProvider initialValue={initialValue}>
            {renderLayout()}
        </StoreProvider>
        
    )
}

MyApp.getInitialProps = async ({ctx}: {ctx: any}) => {
    const {userId, avatar, nickname} = ctx?.req?.cookies || {};
    return {
        initialValue: {
            user: {
                userInfo: {
                    userId,
                    avatar,
                    nickname
                }
            }
        }
    }
}

export default MyApp;