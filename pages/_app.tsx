import type {AppProps} from 'next/app';
import React from 'react';
import Layout from '../components/layout';
import '../styles/globals.css';
import {StoreProvider} from '../store';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <StoreProvider initialValue={{user: {}}}>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </StoreProvider>
        
    )
}

export default MyApp;