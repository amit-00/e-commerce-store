import React from 'react';
import Link from 'next/link';

const CardItem = ({ title, desc, path, icon }) => {
    return (
        <div className="bg-white shadow-xl px-8 py-4 h-72 flex flex-col justify-center">
            <i aria-hidden className={`fas ${icon} p-2 text-4xl mb-4`}></i>
            <h1 className="text-2xl mb-4">{title}</h1>
            <p className="font-light text-gray-600 mb-8">{desc}</p>
            <Link href={path}>
                <a className='hover:text-blue-600 font-medium'>
                    Read More
                </a>
            </Link>
        </div>
    )
}

export default CardItem;
