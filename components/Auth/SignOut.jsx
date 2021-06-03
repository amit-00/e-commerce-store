import React from 'react';
import { auth } from '../../lib/firebase'

const SignOut = ({ styles }) => {
    const signOut = async () => {
        await auth.signOut();
    }

    return (
        <button onClick={signOut} className={styles}>
            <p>Sign Out</p>
        </button>
    )
}

export default SignOut;
