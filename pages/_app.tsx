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
    return (
        <StoreProvider initialValue={initialValue}>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </StoreProvider>
        
    )
}

MyApp.getInitialProps = async ({ctx}: {ctx: any}) => {
    const {userId, avatar, nickname} = ctx?.req.cookies || {};
    console.log({userId, avatar, nickname},'8888')
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