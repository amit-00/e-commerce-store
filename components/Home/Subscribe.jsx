import React, { useState } from 'react';

const Subscribe = () => {
    const [email, setEmail] = useState('')

    return (
        <div className='bg-black p-4 my-32 max-w-7xl mx-auto'>
            <div className="text-center mb-4">
            <h1 className="text-white text-3xl">Subscribe!</h1>
            <p className="text-gray-200">Get information about promos and more</p>
            </div>
            
            <form className="flex max-w-4xl mx-auto">
                <input placeholder='Your Email...' type="text" className="w-full p-2" value={email} onChange={e => setEmail(e.target.value)} />
                <button className="bg-gray-600 text-white p-2">Submit</button>
            </form>
        </div>
    )
}

export default Subscribe;
