import React, { useState, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getWithSlug } from '../../../../lib/firebase';
import Spinner from '../../../../components/Layout/Spinner';
import ImageSlider from '../../../../components/Layout/ImageSlider';
import AddToCart from '../../../../components/Shop/AddToCart';
import { CurrencyContext } from '../../../../lib/context';

export async function getServerSideProps({ query }) {
    const { slug } = query;

    const productDoc = await getWithSlug(slug);
    
    let prod = null;

    prod = productDoc.data();

    return {
        props: { prod }
    }
}

const ProductPage = ({ prod }) => {
    const [product] = useState(prod);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('SM');
    const { cad } = useContext(CurrencyContext);

    const decreaseQuantity = () => {
        if(quantity <= 1){
            return setQuantity(1);
        }
        setQuantity(quantity - 1);
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const changeSize = e => setSize(e.target.value);

    return prod ? (
        <>
        <Head>
            <script src="https://kit.fontawesome.com/05e016c845.js" crossOrigin="anonymous"></script>
        </Head>
        <div className='my-12 px-2 lg:px-0'>
            <Link  href='/wholesale/shop'>
                <a className='bg-black px-4 py-2 text-white'>
                    Go Back
                </a>
            </Link>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-8">
                <div className="justify-self-center">
                    <ImageSlider imgs={product.image} />
                </div>
                <article className="2xl:w-3/5 xl:w-4/5">
                    <h1 className="text-3xl mb-12">{ product.name }</h1>
                    <div className="border-t border-l border-r px-4 py-4">
                        <p className="text-xl mb-4">Price:</p>
                        <p className="text-gray-500 mb-2">0-15: ${cad ? (product.secondCad/100).toFixed(2) : (product.secondUsd/100).toFixed(2)} <span className="text-sm">{ cad ? 'cad' : 'usd' }</span> /unit</p>
                        <p className="text-gray-500 mb-2">15-23: ${cad ? (product.thirdCad/100).toFixed(2) : (product.thirdUsd/100).toFixed(2)} <span className="text-sm">{ cad ? 'cad' : 'usd' }</span> /unit</p>
                        <p className="text-gray-500 mb-2">23-30: ${cad ? (product.fourthCad /100).toFixed(2): (product.fourthUsd/100).toFixed(2)} <span className="text-sm">{ cad ? 'cad' : 'usd' }</span> /unit</p>
                        <p className="text-gray-500 mb-2">30+: Contact Us</p>
                    </div>
                    <div className='border-t border-l border-r px-4 py-4' >
                        <p className="text-xl mb-4">Size</p>
                        <div className="flex">
                            <select type="number" className='border p-2' value={size} onChange={e => changeSize(e)} >
                                <option value="SM">SM</option>
                                <option value="MD">MD</option>
                                <option value="LG">LG</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="XXXL">XXXL</option>
                            </select>
                        </div> 
                    </div>
                    <div className='border-t border-l border-r px-4 py-4' >
                        <label className="text-xl">Quantity</label>
                        <div className="flex mt-4">
                            <button className="border p-2 w-full hover:bg-gray-200 ease-in-out duration-150" onClick={decreaseQuantity}>
                                <i aria-hidden className="fas fa-minus"></i>
                            </button>
                            <input disabled min='1' type="number" className='border p-2' value={quantity} onChange={e => setQuantity(e.target.value)} />
                            <button className="border p-2 w-full hover:bg-gray-200 ease-in-out duration-150" onClick={increaseQuantity}>
                                <i aria-hidden className="fas fa-plus"></i>
                            </button>
                        </div> 
                    </div>
                    <div className='border px-4 py-4' >
                        <AddToCart slug={product.slug} qty={quantity} size={size} wholesale={true} />
                    </div>
                    <p className="text-gray-500 mt-8">Description:</p>
                    <p className='text-lg mt-4' >{ product.description }</p>
                </article>
            </div>
            
        </div>
      </>
    ) : (
        <>
            <Spinner />
        </>
    )
}

export default ProductPage;