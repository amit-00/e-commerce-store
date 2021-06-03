import React, { useState, useContext } from 'react';
import Link from 'next/link';
import GoogleLogin from '../components/Auth/GoogleLogin';
import { registerUser } from '../lib/firebase';
import { UserContext } from '../lib/context';

const register = () => {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const { email, password, cpassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        try{
            if(password !== cpassword){
                return console.log('Passwords Dont Match')
            }
            registerUser(email, password);
            
        }
        catch(err){
            console.error(err)
        }
        
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center' >
            <form onSubmit={e => onSubmit(e)} className="border p-4 md:w-96 w-80">
                <h1 className="text-3xl mb-8">Sign Up</h1>
                <div className='mb-4' >
                    <label className='block text-lg' >Email</label>
                    <input className='border w-full p-2' type="email" name='email' value={email} onChange={e => onChange(e)} />
                </div>
                <div className='mb-4'>
                    <label className='block text-lg' >Password</label>
                    <input className='border w-full p-2' type="password" name='password' value={password} onChange={e => onChange(e)} />
                </div>
                <div className='mb-8'>
                    <label className='block text-lg' >Confirm Password</label>
                    <input className='border w-full p-2' type="password" name='cpassword' value={cpassword} onChange={e => onChange(e)} />
                </div>
                <button type="submit" className='px-4 py-2 bg-black text-white block w-full mb-2 text-lg' >Sign In</button>
                <GoogleLogin />
                <Link href="/register">
                    <a className='text-blue-500 text-sm font-light'>Already registered? Sign In here</a>
                </Link>
            </form>
        </div>
    )
}

export default register;