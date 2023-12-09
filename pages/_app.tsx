import React, { ReactElement, ReactNode, useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/components/createEmotionCache";
import theme from "../src/components/theme";
import "../styles/globals.css";
import { useStore } from "react-redux";
import { wrapper } from "../src/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "../src/contexts/AuthProvider";
import { NoSsr } from "@mui/material";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import Layout from "../src/components/Layout/Layout";
import { NextPage } from "next";
import { AppProps } from "next/app";
import PageProgress from "../src/components/Reused/PageProgress";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: ReturnType<typeof createEmotionCache>;
  pageProps: any;
};

function MyApp(props: AppPropsWithLayout) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  const store: any = useStore();
  const [queryClient] = useState(new QueryClient());

  // prevent mouse right click
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <PersistGate loading={null} persistor={store.__persistor}>
            {() => {
              return (
                <SessionProvider session={session}>
                  <CacheProvider value={emotionCache}>
                    <ThemeProvider theme={theme}>
                      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                      <CssBaseline />
                      <PageProgress />
                      {getLayout(<Component {...pageProps} />)}
                    </ThemeProvider>
                    <ToastContainer
                      position="top-right"
                      autoClose={4000}
                      hideProgressBar={true}
                      newestOnTop={false}
                      draggable={false}
                      closeOnClick
                      pauseOnHover
                      theme="colored"
                    />
                  </CacheProvider>
                </SessionProvider>
              );
            }}
          </PersistGate>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
