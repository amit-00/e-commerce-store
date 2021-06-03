import React, { useContext } from 'react';
import { CartContext } from '../../lib/context';
import Link from 'next/link';

const CartItem = ({ item, currency }) => {
    const cartContext = useContext(CartContext);
    const { name, quantity, image, slug, cad, usd, size, key } = item;

    const increaseQuantity = () => {
        cartContext.updateQuantity(key, quantity + 1);
    }

    const decreaseQuantity = () => {
        cartContext.updateQuantity(key, quantity - 1);
    }

    const deleteItem = () => {
        cartContext.deleteFromCart(key);
    }

    return (
        <div className='border p-2 mb-2'>
            <img className='' className='w-1/2' src={image} alt="" />
            <h1 className="text-lg my-4">{ name }</h1>
            <p className="text-gray-500 mb-4">${ currency ? cad : usd } <span className="text-sm">{ currency ? 'cad' : 'usd' }</span></p>
            <p className="text-gray-500 mb-8">Size: {size}</p>
            <div className="flex justify-between mb-4">
                <button className="border p-2 w-full" onClick={decreaseQuantity}>
                    <i aria-hidden className="fas fa-minus"></i>
                </button>
                <input className='w-11/12 mx-2 px-2' disabled min='1' type="number" value={quantity} />
                <button className="border p-2 w-full" onClick={increaseQuantity}>
                    <i aria-hidden className="fas fa-plus"></i>
                </button>
            </div>
            <div className="flex justify-between">
                <button className='p-2 bg-red-500 text-white w-full mr-2' onClick={deleteItem} >
                    <i aria-hidden className="fas fa-times"></i>
                </button>
                <Link href={`/shop/${slug}`} >
                    <a className='p-2 bg-gray-200 w-full text-center'>
                    <i aria-hidden className="fas fa-long-arrow-alt-right"></i>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default CartItem;

export const CheckoutItem = ({ item, currency }) => {
    const cartContext = useContext(CartContext);
    const { name, quantity, image, slug, cad, usd, size, key } = item;

    const increaseQuantity = () => {
        cartContext.updateQuantity(key, quantity + 1);
    }

    const decreaseQuantity = () => {
        cartContext.updateQuantity(key, quantity - 1);
    }

    const deleteItem = () => {
        cartContext.deleteFromCart(key);
    }

    return (
        <div className='border p-2 mb-2 flex md:flex-row flex-col'>
            <img className='w-72 md:mr-8' src={image} alt="" />
            <div className='w-full' >
                <h1 className="text-lg my-4">{ name }</h1>
                <p className="text-gray-500 mb-4">${ currency ? cad : usd } <span className="text-sm">{ currency ? 'cad' : 'usd' }</span></p>
                <p className="text-gray-500 mb-8">Size: {size}</p>
                <div className="flex justify-between mb-4">
                    <button className="border p-2 w-full" onClick={decreaseQuantity}>
                        <i aria-hidden className="fas fa-minus"></i>
                    </button>
                    <input className='w-11/12 mx-2 px-2' disabled min='1' type="number" value={quantity} />
                    <button className="border p-2 w-full" onClick={increaseQuantity}>
                        <i aria-hidden className="fas fa-plus"></i>
                    </button>
                </div>
                <div className="flex justify-between">
                    <button className='p-2 bg-red-500 text-white w-full mr-2' onClick={deleteItem} >
                        <i aria-hidden className="fas fa-times"></i>
                    </button>
                    <Link href={`/shop/product/${slug}`} >
                        <a className='p-2 bg-gray-200 w-full text-center'>
                        <i aria-hidden className="fas fa-long-arrow-alt-right"></i>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
