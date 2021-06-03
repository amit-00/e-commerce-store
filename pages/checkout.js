import { useContext, useState, useEffect } from 'react';
import { getStripeCheckout } from '../lib/firebase';
import { CartContext, CurrencyContext } from '../lib/context';
import { CheckoutItem } from '../components/Shop/CartItem';
import { useStripe } from '@stripe/react-stripe-js';


const checkout = () => {
    const stripe = useStripe();
    const { cartItems, createLineItem } = useContext(CartContext);
    const { cad } = useContext(CurrencyContext);


    const checkoutItems = async () => {

        const line_items = cartItems.map(product => createLineItem(product, cad));
        const sessionId = await getStripeCheckout(line_items);
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if(error){
            console.log(error);
        }
    }

    return (
        <div className='px-4'> 
            <h1 className="text-3xl max-w-7xl mx-auto mt-16">Checkout</h1>
            <div className='max-w-7xl p-8 border my-12 mx-auto' >
                { cartItems.map(item => <CheckoutItem item={item} key={item.key} currency={cad} />) }
            </div>
            <div className="max-w-7xl mx-auto w-full flex justify-end">
                <button className="text-white px-4 py-2 bg-black" onClick={() => checkoutItems()} >Continue</button>
            </div>
        </div>
    )
}

export default checkout
