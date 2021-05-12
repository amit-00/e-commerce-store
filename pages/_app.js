import Head from 'next/head';
import { Fragment } from 'react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <script src="https://kit.fontawesome.com/05e016c845.js" crossorigin="anonymous"></script>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )

}

export default MyApp
