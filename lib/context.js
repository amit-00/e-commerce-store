import { createContext, useReducer } from "react";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART } from './types';
import { getWithSlug, getStripeCheckout } from "./firebase";
import toast from "react-hot-toast";

export const UserContext = createContext({ user: null });

export const CurrencyContext = createContext({ cad: true });

export const CartContext = createContext();

export const CartReducer = (state, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            const existItem = state.cartItems.find(x => (x.slug === item.slug) && (x.size === item.size));

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.slug === item.slug ? item : x)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.key !== action.payload)
            }
        
        case UPDATE_QUANTITY:
            if(action.payload.qty < 1){
                return {
                    ...state
                }
            }
            return {
                ...state,
                cartItems: state.cartItems.map(x => (x.key === action.payload.key) ? { ...x, quantity: action.payload.qty } : x)
            }

        case CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state;
    }
}

export const CartState = ({ children }) => {

    const initialState = {
        cartItems: []
    };

    const [state, dispatch] = useReducer(CartReducer, initialState);

    async function addToCart (slug, qty, size) {
        try{
            const prodDoc = await getWithSlug(slug);
            let prod = null;
            prod = prodDoc.data();
        
            const quantity = parseFloat(qty);
            const key = slug + '-' + size

            const item = { 
                name: prod.name, 
                cad: prod.cad, 
                usd: prod.usd, 
                price_cad: prod.price_cad, 
                price_usd: prod.price_usd, 
                quantity: quantity, 
                slug: prod.slug, 
                image: prod.image[0],
                size: size,
                key: key
            };

            console.log(item);

            dispatch({
                type: CART_ADD_ITEM,
                payload: item
            });

            toast.success("Added Item!");
        }
        catch{
            toast.error("Failed to Add");
        }
    };

    const createLineItem = ( item, currency ) => {
        const quantity = item.quantity;
        const price = currency ? item.price_cad : item.price_usd;
        const tax_rates = [ 'txr_1IxaCtFt4Z3ThmHtgiWV5GWJ' ];
        const description = item.size;

        const line_item = {
            quantity,
            price,
            description,
            tax_rates,
        }
        return line_item;
    }

    const deleteFromCart = key => {
        dispatch({ type: CART_REMOVE_ITEM, payload: key })
        toast.success("Item Removed!")
    };

    const updateQuantity = ( key, qty ) => dispatch({ type: UPDATE_QUANTITY, payload: { key, qty } });
    
    return ( 
        <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, deleteFromCart, updateQuantity, createLineItem }}>
            {children}
        </CartContext.Provider>
    )
}

