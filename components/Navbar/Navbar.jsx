import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar';
import Cart from '../Shop/Cart';
import SignOut from '../Auth/SignOut';
import { UserContext } from '../../lib/context';
import { checkUserStatus } from '../../lib/firebase';
import Dropdown from './Dropdown';
import CurrencyToggle from '../Shop/CurrencyToggle';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const [hover, setHover] = useState(false);
    const [whole, setWhole] = useState(false);

    useEffect(async () => {
        const status = await checkUserStatus();
        setWhole(status)
    }, [user])

    const enterDropdown = () => {
        if(window.innerWidth < 768) {
            setHover(false);
        } else {
            setHover(true);
        }
    };
    const exitDropdown = () => setHover(false);

    return (
        <>
        <header className='sticky top-0 left-0 z-50'>
            <div className="bg-gray-200 p-2 flex-row justify-end w-full hidden md:flex">
            { user ? (
                <>
                    <CurrencyToggle />
                    <SignOut styles='text-white md:text-black ml-4 items-center px-4 font-light text-sm' />
                </>
            ) : (
                <>  
                    <div className="hidden sm:block">
                        <CurrencyToggle />
                    </div>
                    <Link href="/login">
                        <a className='text-white md:text-black ml-4 items-center px-4 font-light text-sm'>
                            <p>Sign In</p>
                        </a>
                    </Link>
                    <p>|</p>
                    <Link href="/wholesale">
                        <a className='text-white md:text-black items-center px-4 font-light text-sm'>
                            <p>Sign Up</p>
                        </a>
                    </Link>
                </>
            ) }
            </div>
            <div className="flex flex-row justify-between items-center bg-black md:bg-white px-4 sm:px-12 md:border-b-2">
                <div className="justify-self-start md:hidden flex-1 py-4">
                    <Sidebar />
                </div>
                <Link href='/' >
                    <a className='flex items-center justify-self-center md:justify-self-start md:flex-1' >
                        <img className='w-10 hidden md:block' src="/imprint-logo.svg" alt="logo" />
                        <img className='w-10 md:hidden' src="/logo-white.svg" alt="logo" />
                        <h1 className='text-white md:text-black ml-2' >Vinyl Imprint</h1>
                    </a>
                </Link>
                <nav className="hidden md:block max-w-6xl mx-auto flex-auto">
                    <div className='' >
                        <ul className="flex flex-row justify-between">
                            <li className='py-6' >
                                <Link href='/about' >
                                    <a className='text-black'>
                                    About
                                    </a>
                                </Link>
                            </li>
                            <li className='py-6' >
                                <Link href='/services' >
                                    <a className='text-black'>
                                    Services
                                    </a>
                                </Link>
                            </li>
                            <li className='py-6' onMouseEnter={() => enterDropdown()} onMouseLeave={() => exitDropdown()} >
                                <Link href='/shop' >
                                    <a className='text-black'>
                                    Shop
                                    </a>
                                </Link>
                                { hover && <Dropdown /> }
                            </li>
                            {whole && (
                                <li className='py-6' >
                                    <Link href='/wholesale/shop' >
                                        <a className='text-black'>
                                        Wholesale
                                        </a>
                                    </Link>
                                </li>
                            )}
                            <li className='py-6' >
                                <Link href='/design' >
                                    <a className='text-black'>
                                    Design
                                    </a>
                                </Link>
                            </li>
                            <li className='py-6' >
                                <Link href='/contact' >
                                    <a className='text-black'>
                                    Contact
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div> 
                </nav>
                <div className='flex-1 flex w-full justify-end'>
                    <Cart />
                </div>
            </div>
            
        </header>
        </>
        
    )
}

export default Navbar
