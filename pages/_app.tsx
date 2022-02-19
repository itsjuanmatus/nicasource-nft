import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps, router }: AppProps) {
  // these lines fix a recent issue with framer and nextjs
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!isLoaded) {
    return <></>;
  }

  // router.route returns the route you're on, e.g. '/' or '/[id]'

  return <Component {...pageProps} key={router.route} />;
}

export default MyApp;
