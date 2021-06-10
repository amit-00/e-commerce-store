import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../lib/context';
import { useRouter } from 'next/router';
import { checkUserStatus, auth } from '../lib/firebase';
import Link from 'next/link';

const login = () => {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(async () => {
        const status = await checkUserStatus();
        if(status) {
            router.push('/wholesale/shop');
        }
    }, [user]);

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        try{
            await auth.signInWithEmailAndPassword(email, password);
        }
        catch(err){
            console.error(err)
        }
        
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center' >
            <form onSubmit={e => onSubmit(e)} className="border p-4 w-80 md:w-96">
                <h1 className="text-3xl mb-8">Sign In</h1>
                <div className='mb-4' >
                    <label className='block text-lg' >Email</label>
                    <input className='border w-full p-2' type="email" name='email' value={email} onChange={e => onChange(e)} />
                </div>
                <div className='mb-8'>
                    <label className='block text-lg' >Password</label>
                    <input className='border w-full p-2' type="password" name='password' value={password} onChange={e => onChange(e)} />
                </div>
                <button type="submit" className='px-4 py-2 bg-black text-white block w-full mb-2 text-lg' >Sign In</button>
                <Link href="/wholesale">
                    <a className='text-blue-500 text-sm font-light'>Not registered? Sign Up here</a>
                </Link>
            </form>
        </div>
    )
}

export default login;
