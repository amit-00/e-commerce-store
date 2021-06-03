import React, { Fragment, useState, useContext } from 'react';
import { CartContext } from '../../lib/context';
import CartGrid from './CartGrid';
import { ShoppingBagIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import CurrencyToggle from './CurrencyToggle';

const Cart = () => {
    const [active, setActive] = useState(false);
    const { cartItems, checkout } = useContext(CartContext);

    const toggle = () => setActive(!active);

    const checkOut = () => {
        checkout();
    }

    return (
        <>
            <div className='cursor-pointer bg-black md:bg-white p-2' onClick={toggle} >
                <ShoppingBagIcon className='w-8 h-8 text-white md:text-black' />
            </div>
            <nav className={`z-20 h-screen bg-white top-0 right-0 w-80 overflow-y-scroll ${active ? 'absolute' : 'hidden'} border-l`} >
                <div className="px-4 sticky top-0 bg-white" >
                    <i onClick={toggle} aria-hidden className="cursor-pointer fas fa-times mx-8 mt-5 mb-2 text-2xl"></i>
                </div>
                <div className='px-4 py-2 bg-white'>
                    <div className="flex justify-between mb-4">
                        <h1 className="text-2xl">Cart</h1>
                        <CurrencyToggle />
                    </div>
                    <CartGrid products={cartItems} />

                    { cartItems.length >= 1 && (<div className="sticky bottom-0 bg-white w-full py-2">
                        <Link href='/checkout' >
                            <a className="bg-black text-xl text-white w-full block text-center px-4 py-2" onClick={toggle}>
                                Checkout
                            </a>
                        </Link>
                    </div>)}
                </div>
            </nav>
        </>
    )
}

export default Cart;
