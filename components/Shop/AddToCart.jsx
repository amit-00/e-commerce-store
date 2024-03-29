import React, { useContext } from 'react';
import { CartContext } from '../../lib/context';

const AddToCart = ({ slug, qty, wholesale }) => {
    const { addToCart } = useContext(CartContext);

    const onClick = () => {
        addToCart(slug, qty, wholesale);
    }

    return (
        <button className='w-full py-2 bg-black text-xl text-white uppercase' onClick={onClick} >
            Add to cart
        </button>
    )
}

export default AddToCart;
