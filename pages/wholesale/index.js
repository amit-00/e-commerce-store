import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { registerWholesaleUser } from '../../lib/firebase';
import { UserContext } from '../../lib/context';
import toast from 'react-hot-toast';

const wholesale = () => {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        email: '',
        address: '',
        city: '',
        country: '',
        company: '',
        password: '',
        cpassword: ''
    })

    useEffect(() => {
        if(user){
            router.push('/');
        }
    }, [user]);

    const { f_name, l_name, email, address, city, country, postal, company, password, cpassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        try{
            if(password !== cpassword){
                return toast.error('Passwords Dont Match');
            }
            registerWholesaleUser(formData);
            
        }
        catch(err){
            console.error(err)
        }
        
    }

    return (
        <div className='max-w-5xl mx-auto px-4 my-12' >
            <h1 className="text-5xl mb-4">Wholesale</h1>
            <p className="text-2xl">Sign up for a wholesale account to purchase products in bulk</p>
            <form onSubmit={e => onSubmit(e)} className="border p-4 w-full my-12 grid md:grid-cols-2 grid-cols-1 gap-8">
                <h1 className="text-3xl mb-8 md:col-span-2 col-span-1">Sign Up</h1>
                <div className='mb-4' >
                    <label className='block text-lg' >First Name *</label>
                    <input required className='border w-full p-2' type="text" name='f_name' value={f_name} onChange={e => onChange(e)} />
                </div>
                <div className='mb-4' >
                    <label className='block text-lg' >Last Name *</label>
                    <input required className='border w-full p-2' type="text" name='l_name' value={l_name} onChange={e => onChange(e)} />
                </div>
                <div className='mb-4' >
                    <label className='block text-lg' >Email *</label>
                    <input required className='border w-full p-2' type="email" name='email' value={email} onChange={e => onChange(e)} />
                </div>
                <div className='mb-4' >
                    <label className='block text-lg' >Address *</label>
                    <input required className='border w-full p-2' type="text" name='address' value={address} onChange={e => onChange(e)} />
                </div>
                <div className='mb-4' >
                    <label className='block text-lg' >City *</label>
                    <input required className='border w-full p-2' type="text" name='city' value={city} onChange={e => onChange(e)} />
                </div>
                <div className='mb-4' >
                    <label className='block text-lg' >Country *</label>
                    <input required className='border w-full p-2' type="text" name='country' value={country} onChange={e => onChange(e)} />
                </div>
                <div className='mb-4' >
                    <label className='block text-lg' >Postal Code *</label>
                    <input required className='border w-full p-2' type="text" name='postal' value={postal} onChange={e => onChange(e)} />
                </div>
                <div className='mb-4' >
                    <label className='block text-lg' >Company</label>
                    <input className='border w-full p-2' type="text" name='company' value={company} onChange={e => onChange(e)} />
                </div>
                <div className='mb-4'>
                    <label className='block text-lg' >Password *</label>
                    <input required className='border w-full p-2' type="password" name='password' value={password} onChange={e => onChange(e)} />
                </div>
                <div className='mb-8'>
                    <label className='block text-lg' >Confirm Password *</label>
                    <input required className='border w-full p-2' type="password" name='cpassword' value={cpassword} onChange={e => onChange(e)} />
                    {cpassword !== '' && (password === cpassword ? <p className='text-sm text-green-500' >Passwords Match!</p> : <p className='text-sm text-red-500' >Passwords Don't Match!</p>)}
                </div>
                <button type="submit" className='px-4 py-2 bg-black text-white block w-full mb-2 text-lg md:col-span-2 col-span-1' >Sign Up</button>
                <Link href="/register">
                    <a className='text-blue-500 text-sm font-light md:col-span-2 col-span-1'>Already registered? Sign In here</a>
                </Link>
            </form>
        </div>
    )
}

export default wholesale;