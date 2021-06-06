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
    const [quantitySM, setQuantitySM] = useState(0);
    const [quantityMD, setQuantityMD] = useState(0);
    const [quantityLG, setQuantityLG] = useState(0);
    const [quantityXL, setQuantityXL] = useState(0);
    const [quantityXXL, setQuantityXXL] = useState(0);
    const [quantityXXXL, setQuantityXXXL] = useState(0);
    const { cad } = useContext(CurrencyContext);

    const increaseSM = () => setQuantitySM(quantitySM + 1);
    const increaseMD = () => setQuantityMD(quantityMD + 1);
    const increaseLG = () => setQuantityLG(quantityLG + 1);
    const increaseXL = () => setQuantityXL(quantityXL + 1);
    const increaseXXL = () => setQuantityXXL(quantityXXL + 1);
    const increaseXXXL = () => setQuantityXXXL(quantityXXXL + 1);

    const decreaseSM = () => (quantitySM <= 0) ? setQuantitySM(0) : setQuantitySM(quantitySM - 1);
    const decreaseMD = () => (quantityMD <= 0) ? setQuantityMD(0) : setQuantityMD(quantityMD - 1);
    const decreaseLG = () => (quantityLG <= 0) ? setQuantityLG(0) : setQuantityLG(quantityLG - 1);
    const decreaseXL = () => (quantityXL <= 0) ? setQuantityXL(0) : setQuantityXL(quantityXL - 1);
    const decreaseXXL = () => (quantityXXL <= 0) ? setQuantityXXL(0) : setQuantityXXL(quantityXXL - 1);
    const decreaseXXXL = () => (quantityXXXL <= 0) ? setQuantityXXXL(0) : setQuantityXXXL(quantityXXXL - 1);


    

    return prod ? (
        <>
        <Head>
            <script src="https://kit.fontawesome.com/05e016c845.js" crossOrigin="anonymous"></script>
        </Head>
        <div className='my-12 px-2 lg:px-0'>
            <Link  href='/shop'>
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
                    <p className="text-xl border-t border-l border-r px-4 py-4">Price: ${ cad ? (product.cad/100).toFixed(2) : (product.usd/100).toFixed(2) } <span className="text-sm">{ cad ? 'cad' : 'usd' }</span></p>
                    {/* <div className='border-t border-l border-r px-4 py-4' >
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
                    </div> */}
                    <div className='border-t border-l border-r px-4 py-4' >
                        <p className="text-xl mb-4">Size</p>
                        <div className="flex flex-col">
                            <div className="my-2 flex items-center justify-between">
                                <label>SM: </label>
                                <div className="flex">
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={decreaseSM}>
                                        <i aria-hidden className="fas fa-minus"></i>
                                    </button>
                                    <input disabled min='0' type="number" className='border p-2' value={quantitySM}  />
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={increaseSM}>
                                        <i aria-hidden className="fas fa-plus"></i>
                                    </button>
                                </div> 
                            </div>
                            <div className="my-2 flex items-center justify-between">
                                <label>MD: </label>
                                <div className="flex">
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={decreaseMD}>
                                        <i aria-hidden className="fas fa-minus"></i>
                                    </button>
                                    <input disabled min='0' type="number" className='border p-2' value={quantityMD} />
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={increaseMD}>
                                        <i aria-hidden className="fas fa-plus"></i>
                                    </button>
                                </div> 
                            </div>
                            <div className="my-2 flex items-center justify-between">
                                <label>LG: </label>
                                <div className="flex">
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={decreaseLG}>
                                        <i aria-hidden className="fas fa-minus"></i>
                                    </button>
                                    <input disabled min='0' type="number" className='border p-2' value={quantityLG}  />
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={increaseLG}>
                                        <i aria-hidden className="fas fa-plus"></i>
                                    </button>
                                </div> 
                            </div>
                            <div className="my-2 flex items-center justify-between">
                                <label>XL: </label>
                                <div className="flex">
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={decreaseXL}>
                                        <i aria-hidden className="fas fa-minus"></i>
                                    </button>
                                    <input disabled min='0' type="number" className='border p-2' value={quantityXL}  />
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={increaseXL}>
                                        <i aria-hidden className="fas fa-plus"></i>
                                    </button>
                                </div> 
                            </div>
                            <div className="my-2 flex items-center justify-between">
                                <label>XXL: </label>
                                <div className="flex">
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={decreaseXXL}>
                                        <i aria-hidden className="fas fa-minus"></i>
                                    </button>
                                    <input disabled min='0' type="number" className='border p-2' value={quantityXXL}  />
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={increaseXXL}>
                                        <i aria-hidden className="fas fa-plus"></i>
                                    </button>
                                </div> 
                            </div>
                            <div className="my-2 flex items-center justify-between">
                                <label>XXXL: </label>
                                <div className="flex">
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={decreaseXXXL}>
                                        <i aria-hidden className="fas fa-minus"></i>
                                    </button>
                                    <input disabled min='0' type="number" className='border p-2' value={quantityXXXL}  />
                                    <button className="border py-2 px-6 hover:bg-gray-200 ease-in-out duration-150" onClick={increaseXXXL}>
                                        <i aria-hidden className="fas fa-plus"></i>
                                    </button>
                                </div> 
                            </div>
                        </div> 
                    </div>
                    {/* <div className='border-t border-l border-r px-4 py-4' >
                        <p className="text-xl mb-4">Quantity</p>
                        <div className="flex">
                            <button className="border p-2 w-full hover:bg-gray-200 ease-in-out duration-150" onClick={decreaseQuantity}>
                                <i aria-hidden className="fas fa-minus"></i>
                            </button>
                            <input disabled min='1' type="number" className='border p-2' value={quantity} onChange={e => setQuantity(e.target.value)} />
                            <button className="border p-2 w-full hover:bg-gray-200 ease-in-out duration-150" onClick={increaseQuantity}>
                                <i aria-hidden className="fas fa-plus"></i>
                            </button>
                        </div> 
                    </div> */}
                    <div className='border px-4 py-4' >
                        <AddToCart slug={product.slug} qty={{SM: quantitySM, MD: quantityMD, LG: quantityLG, XL: quantityXL, XXL: quantityXXL, XXXL: quantityXXXL}} wholesale={false} />
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
