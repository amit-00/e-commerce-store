import React from 'react';
import Link from 'next/link';

const Dropdown = ({ whole }) => {
    const tops = [
        {
            title: 'Hoodies',
            path: '/shop?category=Hoodie'
        },
        {
            title: 'Zip Ups',
            path: '/shop?category=Zipup'
        },
        {
            title: 'Crewnecks',
            path: '/shop?category=Crewneck'
        },
        {
            title: 'Short Sleeve',
            path: '/shop?category=Shortsleeve'
        },
        {
            title: 'Long Sleeve',
            path: '/shop?category=Longsleeve'
        },
        {
            title: 'Polos',
            path: '/shop?category=Polo'
        },
        {
            title: 'Tanktops',
            path: '/shop?category=Tanktop'
        },
    ]
    const accessories = [
        {
            title: 'Hats',
            path: '/shop?category=Hat'
        },
        {
            title: 'Beanies',
            path: '/shop?category=Beanie'
        },
        {
            title: 'Masks',
            path: '/shop?category=Mask'
        }
    ]
    const promo = [
        {
            title: 'Water Bottles',
            path: '/shop?category=Waterbottle'
        },
        {
            title: 'Bags',
            path: '/shop?category=Bag'
        },
        {
            title: 'Towels',
            path: '/shop?category=Towel'
        },
        {
            title: 'Business cards',
            path: '/shop?category=Card'
        },
        {
            title: 'Stickers',
            path: '/shop?category=Sticker'
        },
    ]
    const more = [
        {
            title: 'Aprons',
            path: '/shop?category=Apron'
        },
        {
            title: 'Sweatpants',
            path: '/shop?category=Sweatpants'
        },
        {
            title: 'Shorts',
            path: '/shop?category=Shorts'
        },
        {
            title: 'Jackets',
            path: '/shop?category=Jacket'
        },
        {
            title: 'Leggings',
            path: '/shop?category=Leggings'
        },
    ]

    return (
        <div className='absolute top-28 left-0 w-full bg-white p-4 grid grid-cols-5 border-t-2 border-b-2 shadow-2xl py-4' >
            <div className="justify-self-center">
                <h1 className="text-lg border-b-2 pl-2">Tops</h1>
                <div className="flex flex-col">
                    { tops.map(link => (
                        <Link key={link.path} href={link.path} >
                            <a className='p-2 hover:bg-gray-200' >{link.title}</a>
                        </Link>
                    )) }
                </div>
            </div>
            <div className="justify-self-center">
                <h1 className="text-lg border-b-2 pl-2">Accesories</h1>
                <div className="flex flex-col">
                    { accessories.map(link => (
                        <Link key={link.path} href={link.path} >
                            <a className='p-2 hover:bg-gray-200' >{link.title}</a>
                        </Link>
                    )) }
                </div>
            </div>
            <div className="justify-self-center">
                <h1 className="text-lg border-b-2 pl-2">More</h1>
                <div className="flex flex-col">
                    { more.map(link => (
                        <Link key={link.path} href={link.path} >
                            <a className='p-2 hover:bg-gray-200' >{link.title}</a>
                        </Link>
                    )) }
                </div>
            </div>
            <div className="justify-self-center ">
                <h1 className="text-lg border-b-2 pl-2">Promo</h1>
                <div className="flex flex-col">
                    { promo.map(link => (
                        <Link key={link.path} href={link.path} >
                            <a className='p-2 hover:bg-gray-200' >{link.title}</a>
                        </Link>
                    )) }
                </div>
            </div>
            <div className="justify-self-center flex flex-col justify-around">
                <Link href='/shop?category=Predesigned' >
                    <a className='p-2 hover:bg-gray-200 text-lg border text-center' >Pre-Designed</a>
                </Link>
                <Link href='/shop?category=Vinyl' >
                    <a className='p-2 hover:bg-gray-200 text-lg border text-center' >Vinyl Imprint</a>
                </Link>
                <Link href={whole ? '/wholesale/shop' : '/wholesale'} >
                    <a className='p-2 hover:bg-gray-200 text-lg border text-center' >Wholesale</a>
                </Link>
                <Link href='/guide' >
                    <a className='p-2 hover:bg-gray-200 text-lg border text-center' >Size Guide</a>
                </Link>
            </div>
        </div>
    )
}

export default Dropdown;
