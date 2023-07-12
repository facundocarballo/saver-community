import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SaverProvider } from "../src/context";
import { theme } from "../styles/theme";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SaverProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SaverProvider>
    </>
  );
}

export default MyApp;
