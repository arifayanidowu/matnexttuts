import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import { parseCookies, destroyCookie } from "nookies";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import theme from "../lib/theme";
import { redirectUser } from "../lib/auth";
import baseUrl from "../lib/baseUrl";
import jwt from "jsonwebtoken";
import cookies from "js-cookie";

export default class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = Component.getInitialProps(ctx);
    }

    const { token } = parseCookies(ctx) || {};

    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload = {
          headers: { authorization: "Bearer ".concat(token) }
        };
        const response = await axios.get(`${baseUrl}/api/auth/`, payload);
        const user = response.data;
        pageProps.user = user;

        const isLoggedIn =
          ctx.pathname === "/login" ||
          ctx.pathname === "/signup" ||
          ctx.pathname === "/forgotpassword";
        if (user) {
          if (isLoggedIn) {
            redirectUser(ctx, "/");
          }
        }
      } catch (error) {
        console.log(error.message);
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login");
      }
    }

    return {
      pageProps
    };
  };

  componentDidMount() {
    //Remove the server-side injected CSS.
    // const jssStyles = document.querySelector("#jss-server-side");
    // if (jssStyles) {
    //   jssStyles.parentElement.removeChild(jssStyles);
    // }
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
