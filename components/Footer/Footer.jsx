import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const links = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'Shop',
            path: '/shop'
        },
        {
            title: 'Design Studio',
            path: '/design'
        },
        {
            title: 'About',
            path: '/about'
        },
        // {
        //     title: 'Services',
        //     path: '/services'
        // }
    ]

    const contact = ['vinyl.imprint1@gmail.com', 'Instagram: @vinyl.imprint', 'Facebook: /vinylimprint', '647-741-3874'];
    const policies = [
        {
            title: 'Terms of Service',
            path: '/policies/terms'
        },
        {
            title: 'Privacy Policy',
            path: 'https://www.privacypolicies.com/live/b7fdcb88-f384-4bdb-9ebb-f7602ff79507'
        },
        // {
        //     title: 'Shipping Policy',
        //     path: '/policies/shipping'
        // },
        {
            title: 'Return Policy',
            path: 'https://www.privacypolicies.com/live/cda28dcf-6721-445c-aa8a-53415c8d6f42'
        },
        {
            title: 'Order Cancellation',
            path: '/policies/cancellation'
        },
    ]

    return (
        <div className='w-full px-4 sm:px-12 bg-gray-100 py-6' >
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
                <div className="flex flex-col lg:justify-self-center">
                    <h1 className="text-xl w-full border-b mx-auto mb-4 pl-2">Links</h1>
                    { links.map(link => (
                        <Link key={link.path} href={link.path} >
                            <a className='p-2 hover:bg-gray-200' >{link.title}</a>
                        </Link>
                    )) }
                </div>
                <div className="flex flex-col lg:justify-self-center">
                    <h1 className="text-xl w-full border-b mx-auto mb-4 pl-2">Contact</h1>
                    { contact.map(item => <p key={item} className="p-2 hover:bg-gray-200">{item}</p>) }
                </div>
                <div className="flex flex-col lg:justify-self-center">
                    <h1 className="text-xl w-full border-b mx-auto mb-4 lg:text-center">Social Media</h1>
                    <div className="flex flex-row justify-around text-xl">
                        <Link href='https://www.instagram.com/vinyl.imprint' >
                        <a >
                            <i aria-hidden className="fab fa-instagram p-2 hover:bg-gray-200"></i>
                        </a>
                        </Link>
                        <Link href='https://www.instagram.com' >
                        <a >
                            <i aria-hidden className="fab fa-facebook p-2 hover:bg-gray-200"></i>
                        </a>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col lg:justify-self-center">
                    <h1 className="text-xl w-full border-b mx-auto mb-4 pl-2">Policies</h1>
                    { policies.map(link => (
                        <Link key={link.path} href={link.path} >
                            <a className='p-2 hover:bg-gray-200' >{link.title}</a>
                        </Link>
                    )) }
                </div>
            </div>
        </div>
    )
}

export default Footer;
