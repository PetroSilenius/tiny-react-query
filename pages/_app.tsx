// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider, ReactQueryDevtools } from 'tiny-react-query';
import Head from 'next/head';
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Tiny React Query</title>
        <meta name="description" content="Creating simplified react query as a tiny package" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
