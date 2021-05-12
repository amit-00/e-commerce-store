import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="grid grid-cols-11 gap-4 h-full items-center">
            <img className='w-4/5' src="/imprint-logo.jpeg" alt="" />
            <h1 className="text-4xl text-gray-800">Vinyl Imprint</h1>
            <div className="col-span-2 col-start-8 flex flex-row justify-around">
                <i aria-hidden className="fas fa-search text-2xl text-gray-800"></i>
                <i aria-hidden className="fas fa-shopping-cart text-2xl text-gray-800"></i>
                <i aria-hidden className="fas fa-comment text-2xl text-gray-800"></i>
            </div>
            <Link href='/login'>
                <a className='px-4 py-2 text-white w-full bg-gray-800 text-center text-xl hover:bg-gray-600'>
                    Login
                </a>
            </Link>
        </header>
    )
}

export default Navbar;;
