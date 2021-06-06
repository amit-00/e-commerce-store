import React, { useContext } from 'react';
import { CartContext } from '../../lib/context';
import Link from 'next/link';

const CartItem = ({ item, currency }) => {
    const cartContext = useContext(CartContext);
    const { name, image, slug, cad, usd, size, wholesale } = item;

    const deleteItem = () => {
        cartContext.deleteFromCart(slug);
    }

    return (
        <div className='border p-2 mb-2'>
            <img className='' className='w-1/2' src={image} alt="" />
            <h1 className="text-lg my-4">{ name }</h1>
            <p className="text-gray-500 mb-4">${ currency ? (cad/100).toFixed(2) : (usd/100).toFixed(2) } <span className="text-sm">{ currency ? 'cad' : 'usd' }</span></p>
            <p className="text-gray-500">Size:</p>
            <div className="text-gray-500 mb-4">
                { size.map(si => <p key={si.size}>{si.size}: {si.quantity}</p>) }
            </div>
            <div className="flex justify-between">
                <button className='p-2 bg-red-500 text-white w-full mr-2' onClick={deleteItem} >
                    <i aria-hidden className="fas fa-times"></i>
                </button>
                <Link href={wholesale ? `/wholesale/product/${slug}` : `/shop/product/${slug}`} >
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
    const { name, image, slug, cad, usd, size, wholesale } = item;

    const deleteItem = () => {
        cartContext.deleteFromCart(slug);
    }

    return (
        <div className='border p-2 mb-2 flex md:flex-row flex-col'>
            <img className='w-72 md:mr-8' src={image} alt="" />
            <div className='w-full' >
                <h1 className="text-lg my-4">{ name }</h1>
                <p className="text-gray-500 mb-4">${ currency ? (cad/100).toFixed(2) : (usd/100).toFixed(2) } <span className="text-sm">{ currency ? 'cad' : 'usd' }</span></p>
                <p className="text-gray-500 mb-2">Size:</p>
                <div className="text-gray-500 mb-4">
                    { size.map(si => <p key={si.size}>{si.size}: {si.quantity}</p>) }
                </div>
                <div className="flex justify-between">
                    <button className='p-2 bg-red-500 text-white w-full mr-2' onClick={deleteItem} >
                        <i aria-hidden className="fas fa-times"></i>
                    </button>
                    <Link href={wholesale ? `/wholesale/product/${slug}` : `/shop/product/${slug}`} >
                        <a className='p-2 bg-gray-200 w-full text-center'>
                        <i aria-hidden className="fas fa-long-arrow-alt-right"></i>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
