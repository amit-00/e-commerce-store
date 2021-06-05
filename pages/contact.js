import { PhoneIcon, MailIcon } from '@heroicons/react/outline';
import Head from 'next/head';

const contact = () => {
    return (
        <>
            <Head>
              <script src="https://kit.fontawesome.com/05e016c845.js" crossOrigin="anonymous"></script>
            </Head>
            <h1 className="my-8 text-3xl">Contact Us</h1>
            <div style={{ height: '600px' }} className="mx-auto max-w-7xl border grid grid-cols-3 mb-24">
                <div className="bg-black p-4 flex flex-col justify-between">
                    <div>
                        <img className="mx-auto w-48 mb-8" src="/logo-white.svg" alt="" />
                        <h1 className="text-2xl text-white mb-8">Contact Information</h1>
                    </div>
                    <div>
                    <div className="flex items-center mb-4">
                        <PhoneIcon className='h-8 w-8 text-white mr-4' />
                        <h1 className="text-lg text-white">647-741-3874</h1>
                    </div>
                    <div className="flex items-center mb-4">
                        <MailIcon className='h-8 w-8 text-white mr-4' />
                        <h1 className="text-lg text-white">vinyl.imprint1@gmail.com</h1>
                    </div>
                    </div>
                    <div className="flex justify-around">
                        <i aria-hidden className="fab fa-instagram cursor-pointer text-white text-2xl"></i>
                        <i aria-hidden className="fab fa-facebook cursor-pointer text-white text-2xl"></i>
                    </div>
                </div>
                <form className="col-span-2 p-4">
                    <h1 className="text-2xl">Send us a message</h1>
                    <div className="my-4">
                        <p>Name</p>
                        <input type="text" className='p-2 border rounded w-full' />
                    </div>
                    <div className="my-4">
                        <p>Email</p>
                        <input type="email" className='p-2 border rounded w-full' />
                    </div>
                    <div className="my-4">
                        <p>Company</p>
                        <input type="text" className='p-2 border rounded w-full' />
                    </div>
                    <div className="my-4">
                        <p>details</p>
                        <textarea type="text" className='p-2 border rounded w-full' ></textarea>
                    </div>
                </form>
            </div>
        </>
    )
}

export default contact;
