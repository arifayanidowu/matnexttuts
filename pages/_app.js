import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import { parseCookies, destroyCookie } from "nookies";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../lib/theme";
import { redirectUser } from "../lib/auth";

export default class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    const { token } = parseCookies(ctx);
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // if (!token) {
    //   redirectUser(ctx, "/login");
    //   // destroyCookie(ctx, "token");
    // } else {
    //   pageProps.token = JSON.parse(token);
    // }

    if (token) {
      pageProps.token = JSON.parse(token);
    }
    return {
      pageProps
    };
  };

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>RS LIBRARY</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
