import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { MenuItems } from './MenuItems';

const Sidebar = () => {
    const [active, setActive] = useState(false);

    const toggle = () => setActive(!active);

    return (
        <Fragment>
            <div className="w-full h-48 bg-gray-800">
                <div className="text-white text-4xl flex items-center justify-center w-full h-full">
                    <i aria-hidden className={`fas ${active ? 'fa-times' :'fa-bars'} cursor-pointer px-2 py-2`} onClick={toggle}></i>
                </div>
            </div>
            <nav className={`w-full flex flex-col bg-gray-800 text-center absolute top-48 ease-in-out duration-300 transform ${ active ? 'translate-x-0' : '-translate-x-full' }`}>
                {MenuItems.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <a className='text-white text-xl py-8 bg-gray-800 hover:bg-gray-500 border-b border-gray-600'>
                            {item.title}
                        </a>
                    </Link>
                ))}
            </nav>
        </Fragment>
    )
}

export default Sidebar;
