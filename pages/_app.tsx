import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme';
import { wrapper } from '../src/redux/store';
import createCache from '@emotion/cache';
import { NextComponentType } from 'next';
import WebHeader from '../src/controls/WebHeader/WebHeader';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
    return createCache({ key: 'css', prepend: true });
}

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    url: string;
    emotionCache?: EmotionCache;
    Component: NextComponentType;
}

function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <WebHeader />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
}

const wrappedApp = wrapper.withRedux(MyApp);

export default wrappedApp;
