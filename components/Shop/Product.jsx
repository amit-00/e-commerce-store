import React from 'react';
import Link from 'next/link';

const Product = ({ product, currency, wholesale }) => {

    const { name, image, slug, cad, usd } = product;

    return (
        <Link href={wholesale ? `/wholesale/product/${slug}` : `/shop/product/${slug}`} >
            <a className='p-3 border hover:border-black ease-in-out duration-300' >
                <img src={image} alt="" />
                <h1 className="text-lg my-4">{name}</h1>
                {!wholesale && <p className="text-gray-600 text-xl font-light">${currency ? (cad/100).toFixed(2) : (usd/100).toFixed(2)} <span className="text-sm">{ currency ? 'cad' : 'usd' }</span> </p>}
            </a>
        </Link>
    )
}

export default Product;
