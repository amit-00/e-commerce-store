import React from 'react';
import Link from 'next/link';

const Dropdown = () => {
    const tops = [
        {
            title: 'Hoodies',
            path: '/shop?category=Apple'
        },
        {
            title: 'Zip Ups',
            path: '/shop?category=zipup'
        },
        {
            title: 'Crewnecks',
            path: '/shop?category=crewneck'
        },
        {
            title: 'Short Sleeve',
            path: '/shop?category=shortsleeve'
        },
        {
            title: 'Long Sleeve',
            path: '/shop?category=longsleeve'
        },
        {
            title: 'Polos',
            path: '/shop?category=polo'
        },
        {
            title: 'Tanktops',
            path: '/shop?category=tanktop'
        },
    ]
    const accessories = [
        {
            title: 'Hats',
            path: '/shop?category=hat'
        },
        {
            title: 'Beanies',
            path: '/shop?category=beanie'
        },
        {
            title: 'Masks',
            path: '/shop?category=mask'
        }
    ]
    const promo = [
        {
            title: 'Water Bottles',
            path: '/shop?category=waterbottle'
        },
        {
            title: 'Bags',
            path: '/shop?category=bag'
        },
        {
            title: 'Towels',
            path: '/shop?category=towel'
        },
        {
            title: 'Business cards',
            path: '/shop?category=card'
        },
        {
            title: 'Stickers',
            path: '/shop?category=sticker'
        },
    ]
    const more = [
        {
            title: 'Aprons',
            path: '/shop?category=apron'
        },
        {
            title: 'Sweatpants',
            path: '/shop?category=sweatpants'
        },
        {
            title: 'Shorts',
            path: '/shop?category=shorts'
        },
        {
            title: 'Jackets',
            path: '/shop?category=jacket'
        },
        {
            title: 'leggings',
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
                <Link href='/shop?category=predesigned' >
                    <a className='p-2 hover:bg-gray-200 text-lg border' >Pre-Designed</a>
                </Link>
                <Link href='/shop?category=vinyl' >
                    <a className='p-2 hover:bg-gray-200 text-lg border' >Vinyl Imprint</a>
                </Link>
            </div>
        </div>
    )
}

export default Dropdown;
