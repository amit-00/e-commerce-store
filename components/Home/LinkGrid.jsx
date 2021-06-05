import React from 'react';
import Link from 'next/link';

const LinkGrid = () => {
    const links = [
        {
            title: 'Tshirts',
            path: '/shop?category=Tshirt'
        },
        {
            title: 'Hoodies',
            path: '/shop?category=Hoodie'
        },
        {
            title: 'Polos',
            path: '/shop?category=Polo'
        },
        {
            title: 'Tanktops',
            path: '/shop?category=Tanktop'
        },
        {
            title: 'Headwear',
            path: '/shop?category=Headwear'
        },
        {
            title: 'Masks',
            path: '/shop?category=Mask'
        }
    ]

    return (
        <div className='my-12' >
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {links.map(link => (<Link href={link.path} key={link.path} >
                    <a className="border p-4 hover:border-gray-700 ease-in-out duration-150">
                        <h1 className="text-center text-2xl font-bold">{link.title}</h1>
                        <div className="flex justify-center">
                            <div className="h-80 w-72 bg-gray-500"></div>
                        </div>
                    </a>
                </Link>))}
            </div>
        </div>
    )
}

export default LinkGrid;
