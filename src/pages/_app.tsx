import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="fixed w-full">
        <Layout />
      </div>
      <div className="w-full mx-10 h-full mt-20">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
