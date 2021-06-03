import React from 'react';
import toast from 'react-hot-toast';
import { googleAuthProvider, auth, firestore } from '../../lib/firebase';

const GoogleLogin = () => {
    const signInWithGoogle = async () => {
        try{
            const { additionalInfo: { isNewUser }, user: { email, uid } } = await auth.signInWithPopup(googleAuthProvider);

            if(isNewUser) {
                const data = {
                    uid,
                    email,
                    wholesale: false,
                    verified: false
                }
    
                const userRef = firestore.collection('users').doc();
                await userRef.set(data);
            }
            
        }
        catch(err){
            if(err.message){
                return toast.error(err.message);
            }
            console.log(err);
        }
    }

    return (
        <button className='px-4 py-2 bg-black text-white block w-full mb-2 text-lg text-center' onClick={ signInWithGoogle } >
            <img src="/assets/google.png" className='mx-auto' alt="" style={{ width: '28px' }} />
        </button>
    )
}

export default GoogleLogin;
