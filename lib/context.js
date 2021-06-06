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

            const existItem = state.cartItems.find(x => x.slug === item.slug );

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
                cartItems: state.cartItems.filter(x => x.slug !== action.payload)
            }
        
        default:
            return state;
    }
}

export const CartState = ({ children }) => {
    const initialState = {
        cartItems: []
    }

    const [state, dispatch] = useReducer(CartReducer, initialState);

    async function addToCart (slug, qty, wholesale) {
        try{
            const prodDoc = await getWithSlug(slug);
            let prod = null;
            prod = prodDoc.data();
        
            const quantity = qty.SM + qty.MD + qty.LG + qty.XL + qty.XXL + qty.XXXL;
            const size = filterSize(qty);
            let item;
            
            if(wholesale){
                const res = checkQuantity(prod, quantity);

                item = {
                    name: prod.name, 
                    cad: res[0], 
                    usd: res[2], 
                    price_cad: res[1], 
                    price_usd: res[3], 
                    quantity: quantity, 
                    slug: prod.slug, 
                    image: prod.image[0],
                    size: size,
                    wholesale: true
                }
            }
            else{
                item = { 
                    name: prod.name, 
                    cad: prod.cad, 
                    usd: prod.usd, 
                    price_cad: prod.price_cad, 
                    price_usd: prod.price_usd, 
                    quantity: quantity, 
                    slug: prod.slug, 
                    image: prod.image[0],
                    size: size,
                    wholesale: true
                };
            }
                

            console.log(item);

            dispatch({
                type: CART_ADD_ITEM,
                payload: item
            });

            toast.success("Added Item!");
        }
        catch(err){
            console.log(err)
            toast.error("Failed to Add");
        }
    };

    const checkQuantity = (prod, qty) => {
        if(qty <= 15) {
            return [prod.secondCad, prod.price_secondCad, prod.secondUsd, prod.price_secondUsd]
        }
        if(qty > 15 && qty <= 23) {
            return [prod.thirdCad, prod.price_thirdCad, prod.thirdUsd, prod.price_thirdUsd]
        }
        if(qty > 23) {
            return [prod.fourthCad, prod.price_fourthCad, prod.fourthUsd, prod.price_fourthUsd]
        }
    }

    const filterSize = (obj) => {
        let res = [];
        for (const [key, value] of Object.entries(obj)) {
            if (value > 0){
                res.push({size: key, quantity: value})
            }
        }
        return res;
    }

    const createLineItem = ( item, currency ) => {
        const quantity = item.quantity;
        const price = currency ? item.price_cad : item.price_usd;
        const tax_rates = [ 'txr_1IxaCtFt4Z3ThmHtgiWV5GWJ' ];
        const description = sizeToString(item.size);

        const line_item = {
            quantity,
            price,
            description,
            tax_rates,
        }
        return line_item;
    }

    const deleteFromCart = slug => {
        dispatch({ type: CART_REMOVE_ITEM, payload: slug })
        toast.success("Item Removed!")
    };

    const sizeToString = (arr) => {
        let res = '';
        arr.forEach(item => {
            res += `${item.size}: ${item.quantity}, `
        })
        return res;
    }
    
    return ( 
        <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, deleteFromCart, createLineItem }}>
            {children}
        </CartContext.Provider>
    )
}

