import React from 'react'

const failed = () => {
    return (
        <div className='my-24 max-w-7xl mx-auto px-4' >
            <h1 className="text-black text-5xl text-center mb-8">Something went wrong!</h1>
            <h1 className="text-2xl text-red-600 text-center mb-8">Payment Not Successful</h1>
            <div className="max-w-xl mx-auto">
                <img className='w-full' src="/assets/payment-error.gif" alt="" />
            </div>
        </div>
    )
}

export default failed
