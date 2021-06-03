import { useContext } from 'react';
import CartItem from './CartItem';
import { CurrencyContext } from '../../lib/context';

const CartGrid = ({ products }) => {
    const { cad } = useContext(CurrencyContext);

    return (
        <div className='w-full'>
            {products.map(product => <CartItem key={product.slug + product.size} item={product} currency={cad} />)}
        </div>
    )
}

export default CartGrid;
