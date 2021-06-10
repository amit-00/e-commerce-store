import React from 'react';
import Head from 'next/head';

const about = () => {
    const cards = [
        {
            title: 'Competitive Pricing',
            desc: 'We will beat other prices or quotes!',
            icon: 'fa-comments-dollar'
        },
        {
            title: 'Printing services',
            desc: 'Get custom printing on all kinds of apparel.',
            icon: 'fa-tshirt'
        },
        {
            title: 'Wholesale',
            desc: 'Wholesale for blank products.',
            icon: 'fa-boxes'
        },
    ]
    return (
        <>
        <Head>
            <title>Vinyl Imprint | About Us</title>
            <meta name="description" content="About the Vinyl Imprint Team in the Greater Toronto Area. At Vinyl Imprint, our team is committed to providing you and your business with all your custom clothing needs. Our goal is to help you grow and succeed." />
            <meta name="keywords" content="" />
            <link rel="icon" href="/imprint-logo.svg" />
            <script src="https://kit.fontawesome.com/05e016c845.js" crossOrigin="anonymous"></script>
      </Head>
        <article className='max-w-5xl mx-auto px-4 my-16'>
            <h1 className="text-5xl font-bold mb-16">Who we are</h1>
            <p className="text-xl leading-10 font-light mb-24">Vinyl Imprint is a custom apparel printing service located in Greater Toronto Ontario. We endeavor to provide you with apparel that is fashionable and represents what you do and stand for.  Whether you are a business looking for clothing that represents your company and brand or an individual seeking something for yourself or a friend, we are here to bring your vision to life. </p>
            <h2 className="text-4xl font-bold mb-8">What we offer</h2>
            <div className="mt-16 mb-24">
                <div className="w-full">
                    <div className="px-8">
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 items-center mt-16">
                            {cards.map((item, index) => (
                                <div key={index} className="bg-white shadow-xl px-8 py-4 h-72 flex flex-col justify-center border items-center">
                                    <i aria-hidden className={`fas ${item.icon} p-2 text-6xl mb-4`}></i>
                                    <h1 className="text-2xl mb-4 text-center">{item.title}</h1>
                                    <p className="font-light text-gray-600 mb-8 text-center">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-4xl font-bold mb-8">Our Misison</h2>
            <p className="text-xl leading-10 font-light mb-24">At Vinyl Imprint, our team is committed to providing you and your business with all your custom clothing needs. Our goal is to help you grow and succeed.</p>

            <h2 className="text-4xl font-bold mb-8">Our Sincere Gratitude</h2>
            <p className="text-xl leading-10 font-light mb-24">The team at Vinyl Imprint would like to thank all those who have supported us. Whether it be through a purchase, a share to your story or a referral to a friend, we value each and every one of you and your support does not go unnoticed! If you have any questions regarding what we offer, or would like to join the team, please talk to our live support chat representative, or send us an email at vinyl.imprint1@gmail.com</p>
        </article>
        </>
    )
}

export default about;
