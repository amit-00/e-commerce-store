import React, { Fragment } from 'react';
import Link from 'next/link';

export const SliderCell = ({ item }) => {
    const { title, img, imgDesc, price, desc } = item;

    return(
        <div className='bg-black shadow-xl px-8 pt-4 pb-8 w-96' >
            <img className='' src={img} alt={imgDesc} />
            <h1 className="text-white font-light text-2xl mb-8">{title}</h1>
            <p className="text-gray-300 mb-4">Price <span className='text-white text-lg ml-4'>{price}</span></p>
            <p className="text-gray-300 text-lg mb-4">{desc}</p>
            <Link href='/'>
                <a className='px-4 py-2 border-2 border-white bg-white bg-opacity-50 text-white hover:bg-opacity-75 ease-in-out duration-150' >
                    Shop
                </a>
            </Link>
        </div>
    )
}

const Slider = () => {
    const cards = [
        {
            title: 'Hoodies',
            img: '/assets/hero.jpg',
            imgDesc: 'picture of man in cream hoodie',
            price: '$35',
            desc: 'Shop our hoodies'
        },
        {
            title: 'Hoodies',
            img: '/assets/hero.jpg',
            imgDesc: 'picture of man in cream hoodie',
            price: '$35',
            desc: 'Shop our hoodies'
        },
        {
            title: 'Hoodies',
            img: '/assets/hero.jpg',
            imgDesc: 'picture of man in cream hoodie',
            price: '$35',
            desc: 'Shop our hoodies'
        }
    ]

    return (
        <Fragment>
            <div className="flex flex-row justify-between">
                { cards.map((item, index) => (
                    <SliderCell item={item} key={index} />
                )) }
            </div>
        </Fragment>
    )
}

export default Slider;
