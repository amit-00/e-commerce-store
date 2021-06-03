import React from 'react';
import Link from 'next/link';

const Product = ({ product, currency }) => {

    const { name, image, slug, cad, usd } = product;

    return (
        <Link href={`/shop/product/${slug}`} >
            <a className='p-3 border hover:border-black ease-in-out duration-300' >
                <img src={image} alt="" />
                <h1 className="text-lg my-4">{name}</h1>
                <p className="text-gray-600 text-xl font-light">${currency ? cad : usd} <span className="text-sm">{ currency ? 'cad' : 'usd' }</span> </p>
            </a>
        </Link>
    )
}

export default Product;
