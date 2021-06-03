import React from 'react';
import Slider from "react-slick";
import Link from 'next/link'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 4000,
        autoplay: true,
        arrows: true
    };
    return (
        <div className='my-8 mx-auto' >
            <Slider {...settings}>
                <div className="slide bg-white">
                    <div className='py-8 xl:py-0'>
                        <div className="container mx-auto">
                            <div className="flex flex-col lg:flex-row lg:justify-between justify-center my-12 items-center">
                                <div className="w-full lg:w-1/2 mb-8 px-8 lg:mb-0">
                                    <div className="flex flex-row items-center sm:mb-8 mb-16">
                                        <img className='md:w-48 w-24 mr-4' src="/imprint-logo.svg" alt="" />
                                        <h1 className="md:text-7xl sm:text-6xl text-5xl font-light mb-8">Vinyl Imprint</h1>
                                    </div>
                                    <h1 className=" sm:text-4xl text-2xl font-light mb-8">Shop Custom Clothing</h1>
                                    <p className='text-gray-600 sm:text-xl font-light mb-16' >Buy premium clothing plain or add your own flare in our Design Studio.</p>
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
                                <div className="w-full lg:w-1/3 hidden sm:block">
                                    <img className='' src="/assets/hero.jpg" alt="picture of man in hoodie" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='slide1' >
                    
                </div>
                <div className='slide2'>
                    
                </div>
                <div className='slide3'>
                    
                </div>
                <div className='slide4'>
                    
                </div>
            </Slider>
        </div>
    )
}

export default Carousel;
