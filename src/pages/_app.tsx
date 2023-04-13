import { AppProps } from "next/app";
import Head from "next/head";
import { Container, MantineProvider } from "@mantine/core";
import { Navigation } from "@/components/Navigation/Navigation";
import { useEffect } from "react";
import { RaidsProvider } from "@/context/RaidContext";
import { GetRaids } from "@/components/GetRaids/GetRaids";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page titles</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <RaidsProvider>
          <GetRaids />
          <Navigation />
          <Component {...pageProps} />
        </RaidsProvider>
      </MantineProvider>
    </>
  );
}
