import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../types";

interface CartState {
    products: IProduct[],
    generalQuantity: number;
    generalPrice: number;
}

const initialState: CartState = {
    products: [],
    generalQuantity: 0,
    generalPrice: 0,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<IProduct>) {
            if (!state.products.length || state.products.every(product => product.id !== action.payload.id)) {
                state.generalPrice += action.payload.price;
                state.products = [...state.products, action.payload];
            } else {
                state.products = state.products.map(product => {
                    if (product.id === action.payload.id) {
                        state.generalPrice += product.price;
                        return {...product, quantity: product.quantity + 1};
                    } else {
                        return product;
                    }
                })
            }

            state.generalQuantity += 1;
        },
        reduceQuantityOfProductById(state, action: PayloadAction<number | string>) {
            state.products = state.products.map(product => {
                if (product.id === action.payload) {
                    state.generalPrice -= product.price;
                    return {...product, quantity: product.quantity - 1};
                } else {
                    return product;
                }
            })

            if (!(state.products.find(product => product.id === action.payload))?.quantity) {
                state.products = state.products.filter(product => product.id !== action.payload);
            }

            state.generalQuantity -= 1;
        },
        deleteProductById(state, action: PayloadAction<number | string>) {
            const quantity = (state.products.find(product => product.id === action.payload))?.quantity
            const price = (state.products.find(product => product.id === action.payload))?.price
            state.generalQuantity -= quantity || 0;
            state.generalPrice -= (price || 1) * (quantity || 1);
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        cleanCart(state) {
            state.generalQuantity = 0;
            state.generalPrice = 0;
            state.products = [];
        }
    }
});

export default cartSlice.reducer;