import React from 'react';
import Link from 'next/link';

const ChooseUs = () => {
    return (
        <div className='py-8 xl:py-0'>
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between justify-center my-12 items-center">
                    <div className="w-full lg:w-1/2 mb-8 px-8 lg:mb-0">
                        <h1 className=" text-7xl font-light mb-8">Shop Custom Clothing</h1>
                        <p className='text-gray-600 text-xl font-light mb-16' >Buy premium clothing plain or add your own flare in our Design Studio.</p>
                        <div className="flex lg:justify-start justify-center">
                            <Link href='/shop'>
                                <a className='uppercase font-light bg-black text-white lg:px-8 lg:py-4 hover:bg-opacity-50 ease-in-out duration-150 px-4 py-2 mr-8'>
                                    Shop
                                </a>
                            </Link>
                            <Link href='/design'>
                                <a className='uppercase font-light bg-black text-white hover:bg-opacity-50 ease-in-out duration-150 lg:px-8 lg:py-4 px-4 py-2'>
                                    Design Studio
                                </a>
                            </Link>
                        </div>
                        
                    </div>
                    <img className='w-full lg:w-1/3' src="/assets/hero.jpg" alt="picture of man in hoodie" />
                </div>
            </div>
        </div>
    )
}

export default ChooseUs;
