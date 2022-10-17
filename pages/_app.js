import "../styles/style.css";
import Navbar from "./navbar";
import Footer from "./footer";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module

NProgress.configure({ trickleRate: 0.05, trickleSpeed: 500, minimum: 0.3 });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> D I S H A - CSE MBM </title>{" "}
        <meta
          name="description"
          content="DEPT OF CSE, MBM UNIVERSITY, JODHPUR"
        />
        <link rel="icon" href="/mbmu.ico" />
        <meta
          httpEquiv="Content-Security-Policy"
          // content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <Navbar />
      <div className="main-content">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
