import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FilterProvider } from "../providers/FilterProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FilterProvider>
      <Component {...pageProps} />
    </FilterProvider>
  );
}

export default MyApp;
