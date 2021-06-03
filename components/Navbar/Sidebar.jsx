import React, { Fragment, useState, useContext } from 'react';
import { UserContext } from '../../lib/context';
import Link from 'next/link';
import { MenuItems }from './MenuItems';
import SignOut from '../Auth/SignOut';
import { MenuAlt1Icon, XIcon } from '@heroicons/react/outline';

const Sidebar = () => {
    const { user } = useContext(UserContext);
    const [active, setActive] = useState(false);

    const toggle = () => setActive(!active);

    return (
        <Fragment>
            <div className='cursor-pointer bg-black md:bg-white p-2' onClick={toggle} >
                <MenuAlt1Icon className='w-8 h-8 text-white md:text-black' />
            </div>
            <nav className={`z-50 h-screen bg-black flex flex-col justify-between absolute top-0 left-0 w-80 ease-in-out duration-300 transform ${active ? 'translate-x-0' : '-translate-x-full'} `} >
                <div className="" onClick={toggle}>
                    <XIcon className='w-8 h-8 text-white cursor-pointer mx-14 mt-5' />
                </div>
                <div className="flex flex-col justify-between w-full">
                    { MenuItems.map((item, index) => (
                        <Link href={item.path} key={index} >
                            <a onClick={() => toggle()} className='text-white  px-14 py-4 hover:bg-gray-900' >{item.title}</a>
                        </Link>
                    )) }
                </div>
                <div className="">
                    { user ? (
                        <>
                            <SignOut styles='text-white p-2 px-12 mb-5 flex items-center hover:bg-gray-900 w-full' />
                            <Link href={`/profile`}>
                                <a className='text-white p-2 px-12 mb-5 flex items-center hover:bg-gray-900'>
                                    <p>Profile</p>
                                </a>
                            </Link>
                        </>
                        
                    ) : (
                        <>
                            <Link href="/login">
                                <a className='text-white p-2 px-12 mb-5 flex items-center hover:bg-gray-900'>
                                    <p>Sign In</p>
                                </a>
                            </Link>
                            <Link href="/register">
                                <a className='text-white p-2 px-12 mb-5 flex items-center hover:bg-gray-900'>
                                    <p>Sign Up</p>
                                </a>
                            </Link>
                        </>
                    ) }
                    
                </div>
            </nav>
            <div className={`z-10 w-full h-screen top-0 left-0 bg-black bg-opacity-75 ${active ? 'absolute' : 'hidden'}`} onClick={toggle}></div>
        </Fragment>
    )
}

export default Sidebar;
