import { useContext } from 'react';
import Product from './Product';
import { CurrencyContext } from '../../lib/context';

const ProductGrid = ({ products, wholesale }) => {
    const { cad } = useContext(CurrencyContext);

    return products.length === 0 ? (
        <>
            <h1 className="text-xl w-full text-center mb-4">No results found.</h1>
            <h1 className="text-xl w-full text-center">Press clear to reset filters.</h1>
        </>
    ) : (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-7xl">
            { products.map(product => <Product key={product.slug} product={product} currency={cad} wholesale={wholesale} />) }
        </div>
    )
}

export default ProductGrid;
