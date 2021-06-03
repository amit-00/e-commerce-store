import React from 'react'

const success = () => {
    return (
        <div className='my-24 max-w-7xl mx-auto px-4' >
            <h1 className="text-black text-5xl text-center mb-8">Thank you for your purchase!</h1>
            <h1 className="text-2xl text-green-600 text-center">Payment Successful</h1>
            <div className="max-w-xl mx-auto">
                <img className='w-full' src="/assets/payment-success.gif" alt="" />
            </div>
        </div>
    )
}

export default success
