import React from 'react';
import CardItem from './CardItem';

const Cards = () => {
    const cards = [
        {
            title: 'Best Prices',
            desc: 'Our designs help you stay updated with new trends.',
            path: '/services',
            icon: 'fa-tags'
        },
        {
            title: 'Fast Worldwide Shipping',
            desc: 'Shipping all over the world. Order anywhere, anytime.',
            path: '/services',
            icon: 'fa-shipping-fast'
        },
        {
            title: 'Wholesale',
            desc: 'Sign up for a wholesale account to see bulk pricing.',
            path: '/wholesale',
            icon: 'fa-boxes'
        },
    ]
    return (
        <div className="mt-32 mb-60">
            <div className="bg-black w-full lg:h-96 py-16">
                <div className="container mx-auto px-8">
                    <h1 className="text-white lg:text-7xl text-4xl font-light">Stay in style with Vinyl Imprint</h1>
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 items-center mt-16">
                        {cards.map((item, index) => <CardItem key={index} title={item.title} desc={item.desc} path={item.path} icon={item.icon} />)}
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Cards;
