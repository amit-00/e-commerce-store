import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import { UserContext, CartState, CurrencyContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import '../styles/globals.css';
import { useState } from 'react';

const stripePromise = loadStripe('pk_test_51Iw6vfFt4Z3ThmHtsc7BKwXTMGpej7xfoO39FYw4qxGYDw2kRJFVxMTWpBUysGpBp1qPczBDNaMnD05KcTajBZEV00zbClYKv7');

function MyApp({ Component, pageProps }) {
  const [cad, setCad] = useState(true);
  const userData = useUserData();

  const changeCurrency = () => setCad(!cad);

  return (
    <Elements stripe={stripePromise} >
      <CartState>
        <CurrencyContext.Provider value={{ cad: cad, changeCurrency }}>
          <UserContext.Provider value={userData} >
            <Toaster />
            <Head>
              <script src="https://kit.fontawesome.com/05e016c845.js" crossOrigin="anonymous"></script>
            </Head>
            <Navbar />
            <div className="2xl:px-12 lg:px-6">
              <Component {...pageProps} />
            </div>
            <Footer />
          </UserContext.Provider>
        </CurrencyContext.Provider>
      </CartState>
    </Elements>
  )
}

export default MyApp
