import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react-is';
import ProductGrid from '../../components/Shop/ProductGrid';
import { firestore, checkUserStatus } from '../../lib/firebase';
import { UserContext } from '../../lib/context';
import Spinner from '../../components/Layout/Spinner';
import { FilterIcon} from '@heroicons/react/solid';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, SearchIcon, XCircleIcon } from '@heroicons/react/outline';

export async function getServerSideProps({ query }) {

    const productsQuery = firestore.collection('products');
    
    const snapshot = await productsQuery.get();

    const prods = snapshot.docs.map(doc => doc.data());

    const catsQuery = firestore.collection('categories');
    const snap = await catsQuery.get();
    const savedCats = snap.docs.map(doc => doc.data());

    return {
        props: { prods, savedCats }
    }
}

const Shop = ({ prods, savedCats, quer }) => {
    const { user } = useContext(UserContext);
    const [whole, setWhole] = useState(false);

    useEffect(async () => {
        const status = await checkUserStatus();
        setWhole(status);
    }, [user])

    const [products, setProducts] = useState(prods);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const [color, setColor] = useState(false);
    const [cats, setCats] = useState(true);

    const [colorFilter, setColorFilter] = useState([]);
    const [catFilter, setCatFilter] = useState([]);

    const searchProducts = e => {
        e.preventDefault();
        setLoading(true);

        const lowSearch = search.toLowerCase();
        if(search === '') {
            setLoading(false);
            setCatFilter([]);
            setColorFilter([]);
            return setProducts(prods);
        }

        const results = prods.filter(item => {
            if(item.slug.includes(lowSearch) || item.description.includes(lowSearch) || item.categories.includes(lowSearch)) {
                return item
            }
        });
        
        setLoading(false);
        setProducts(results);
    }

    const filterProducts = () => {
        setLoading(true);



        if(catFilter.length <= 0 && colorFilter.length <= 0){
            setLoading(false);
            return setProducts(prods);
        }

        if(catFilter.length > 0 && colorFilter.length <= 0){
            const x = prods.filter(item => {
                let includesCat = false;
                let num = 0;

                item.categories.forEach(cat => {
                    if(catFilter.includes(cat)){
                        includesCat = true;
                        num += 1
                    }
                });

                if(includesCat && catFilter.length == num) {
                    return item;
                }
            })
            setLoading(false);
            return setProducts(x);
        }

        if(catFilter.length <= 0 && colorFilter.length > 0){
            const y = prods.filter(item => {
                if(colorFilter.includes(item.color.toLowerCase())){
                    return item
                }
            })
            setLoading(false);
            return setProducts(y);
        }

        const results = prods.filter(item => {

            const includesColor = colorFilter.includes(item.color.toLowerCase());

            let includesCat = false;

            item.categories.forEach(cat => {
                if(catFilter.includes(cat)){
                    includesCat = true;
                }
            });

            if(includesColor && includesCat){
                return item
            }

        })

        setLoading(false);
        setProducts(results);
    }

    const updateColorFilter = filt => {
        if(colorFilter.includes(filt)){
            return setColorFilter(colorFilter.filter(item => item!== filt));
        }
        setColorFilter([ ...colorFilter, filt ]);
    }

    const updateCatFilter = filt => {
        if(catFilter.includes(filt)){
            return setCatFilter(catFilter.filter(item => item!== filt));
        }
        setCatFilter([ ...catFilter, filt ]);
    }

    const highlightFilter = (filt, button = false) => button ? ( catFilter.includes(filt) ) : ( colorFilter.includes(filt) && 'border border-blue-500');

    const clearFilter = () => {
        setSearch('');
        setCatFilter([]);
        setColorFilter([]);
        setProducts(prods);
    }


    return whole ? (loading || !products ? (
        <div className="flex justify-center">
            <Spinner />
        </div>
    ) : (
        <Fragment>
            <Head>
                <script src="https://kit.fontawesome.com/05e016c845.js" crossOrigin="anonymous"></script>
            </Head>
            <div className="px-4 mt-12">
                <h1 className="text-4xl font-medium mb-8">Wholesale Shop</h1>
                <form onSubmit={e => searchProducts(e)} className='max-w-7xl mx-auto flex items-center justify-center mb-12' >
                    <input autoComplete='off' className='p-2 text-xl border w-full' placeholder='Search' type="text" name='search' value={search} onChange={e => setSearch(e.target.value)} />
                    <button type="submit" className='text-white bg-black py-2 px-4 border border-black' >
                        <SearchIcon className='h-7 text-white' />
                    </button>
                    <button onClick={() => clearFilter()} className='text-white bg-black bg-opacity-50 text-lg py-2 px-4 border border-gray-500' type="submit">
                        Clear
                    </button>
                </form>
                <div className="max-w-7xl mx-auto my-4 md:hidden">
                    <button onClick={() => setShowFilter(!showFilter)} className="bg-gray-100 font-light text-xl p-2 flex items-center">
                        Filter
                        <FilterIcon className="h-6 w-6 inline ml-2" aria-hidden="true" />
                    </button>
                </div>
                <div className="md:grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 w-full my-12 gap-8">
                    <div className={`bg-gray-200 h-screen w-full mr-8 ${showFilter ? 'absolute top-0 left-0 w-full h-screen z-50' : 'hidden'} p-4 md:block overflow-y-scroll md:z-0`}>
                        <button className='float-right md:hidden' onClick={() => setShowFilter(!showFilter)}>
                            <XCircleIcon className='h-8 w-8' />
                        </button>
                        <h1 className="text-xl font-light mb-4">
                            Filters
                        </h1>
                        <button onClick={() => setColor(!color)} className="text-lg font-light text-gray-600 p-2 flex items-center w-full border-b">
                            Color 
                            { color ? <ChevronUpIcon className='w-4 h-4 ml-2' /> : <ChevronDownIcon className='w-4 h-4 ml-2' /> }
                        </button>
                        { color && (
                            <div className="grid grid-cols-2 p-2 gap-2">
                                <button value="red" className={`justify-self-center w-16 h-16 cursor-pointer p-2 ${highlightFilter('red')}`} onMouseDown={() => updateColorFilter('red')} onMouseUp={() => filterProducts()} >
                                    <div className="w-6 h-6 rounded-full bg-red-600 mx-auto"></div>
                                    <p className='text-sm' >Red</p>
                                </button>
                                <button value="blue" className={`justify-self-center w-16 h-16 cursor-pointer p-2 ${highlightFilter('blue')}`} onMouseDown={() => updateColorFilter('blue')} onMouseUp={() => filterProducts()} >
                                    <div className="w-6 h-6 rounded-full bg-blue-500 mx-auto"></div>
                                    <p className='text-sm'>Blue</p>
                                </button>
                                <button value="yellow" className={`justify-self-center w-16 h-16 cursor-pointer p-2 ${highlightFilter('yellow')}`} onMouseDown={() => updateColorFilter('yellow')} onMouseUp={() => filterProducts()} >
                                    <div className="w-6 h-6 rounded-full bg-yellow-300 mx-auto"></div>
                                    <p className='text-sm'>Yellow</p>
                                </button>
                                <button value="green" className={`justify-self-center w-16 h-16 cursor-pointer p-2 ${highlightFilter('green')}`} onMouseDown={() => updateColorFilter('green')} onMouseUp={() => filterProducts()} >
                                    <div className="w-6 h-6 rounded-full bg-green-500 mx-auto"></div>
                                    <p className='text-sm'>Green</p>
                                </button>
                                <button value="orange" className={`justify-self-center w-16 h-16 cursor-pointer p-2 ${highlightFilter('orange')}`} onMouseDown={() => updateColorFilter('orange')} onMouseUp={() => filterProducts()} >
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 mx-auto"></div>
                                    <p className='text-sm'>Orange</p>
                                </button>
                                <button value="purple" className={`justify-self-center w-16 h-16 cursor-pointer p-2 ${highlightFilter('purple')}`} onMouseDown={() => updateColorFilter('purple')} onMouseUp={() => filterProducts()} >
                                    <div className="w-6 h-6 rounded-full bg-indigo-500 mx-auto"></div>
                                    <p className='text-sm'>Purple</p>
                                </button>
                                <button value="black" className={`justify-self-center w-16 h-16 cursor-pointer p-2 ${highlightFilter('black')}`} onMouseDown={() => updateColorFilter('black')} onMouseUp={() => filterProducts()} >
                                    <div className="w-6 h-6 rounded-full bg-black mx-auto"></div>
                                    <p className='text-sm'>Black</p>
                                </button>
                                <button value="white" className={`justify-self-center w-16 h-16 cursor-pointer p-2 ${highlightFilter('white')}`} onMouseDown={() => updateColorFilter('white')} onMouseUp={() => filterProducts()} >
                                    <div className="w-6 h-6 rounded-full bg-white mx-auto"></div>
                                    <p className='text-sm'>White</p>
                                </button>
                            </div>
                        ) }
                        <button onClick={() => setCats(!cats)} className="text-lg font-light text-gray-600 p-2 flex items-center w-full border-b">
                            Categories
                            { cats ? <ChevronUpIcon className='w-4 h-4 ml-2' /> : <ChevronDownIcon className='w-4 h-4 ml-2' /> }
                        </button>
                        { cats && (
                            <div className='p-4' >
                                {savedCats.map(cat => (
                                    <div className={`p-2 my-4 flex items-center`} key={cat.name}>
                                        <div className={`border border-black mr-2 cursor-pointer ${highlightFilter(cat.name, true) ? 'bg-black' : 'p-2' } `} onMouseDown={() => updateCatFilter(cat.name)} onMouseUp={() => filterProducts()}>
                                            {highlightFilter(cat.name, true) && <CheckIcon className='text-white h-4 w-4 bg-black' />}
                                        </div>
                                        <p>{cat.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="2xl:col-span-4 xl:col-span-3 md:col-span-2">
                        { (!loading && products) ?  <ProductGrid products={products} wholesale={true} /> : <Spinner /> }
                    </div>
                </div>

            </div>
        </Fragment>
    )) : (
        <div className='max-w-7xl mx-auto flex flex-col items-center justify-center my-24'>
            <div className="mb-16 text-6xl text-center">You need a wholesale account to access this page!</div>
            <Link href='/wholesale' >
                <a className="p-2 bg-black text-white text-2xl">Register Here</a>
            </Link>
        </div>
    )
}

export default Shop;