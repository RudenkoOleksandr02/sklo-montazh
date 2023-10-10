const initialState = {
    furniture: {
        barbells: [],
        fastenings: [],
        handles: [],
        loops: [],
        slidingSystems: [],
        thresholds: [],
        sealers: [],
        profiles: [],
    },
    totalAmount: 0,
};

const ADD_PRODUCT = 'ADD_PRODUCT';
const DECREASE_PRODUCT_QUANTITY = 'DECREASE_PRODUCT_QUANTITY';
const CLEAR_BASKET = 'CLEAR_BASKET';

const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT: {
            const { category, product } = action.payload;
            const categoryIndex = state.furniture[category].findIndex(
                (item) => item.name === product.name
            );

            if (categoryIndex !== -1) {
                const updatedCategory = [...state.furniture[category]];
                updatedCategory[categoryIndex].quantity += 1;
                return {
                    ...state,
                    furniture: { ...state.furniture, [category]: updatedCategory },
                    totalAmount: state.totalAmount + updatedCategory[categoryIndex].price,
                };
            } else {
                return {
                    ...state,
                    furniture: {
                        ...state.furniture,
                        [category]: [
                            ...state.furniture[category],
                            { ...product, quantity: 1 },
                        ],
                    },
                    totalAmount: state.totalAmount + product.price,
                };
            }
        }
        case DECREASE_PRODUCT_QUANTITY: {
            const { category, productName } = action.payload;
            const productIndex = state.furniture[category].findIndex(
                (item) => item.name === productName
            );

            if (productIndex !== -1) {
                const updatedCategory = [...state.furniture[category]];
                const updatedProduct = { ...updatedCategory[productIndex] };

                if (updatedProduct.quantity > 1) {
                    updatedProduct.quantity -= 1;
                    updatedCategory[productIndex] = updatedProduct;
                } else {
                    updatedCategory.splice(productIndex, 1);
                }

                return {
                    ...state,
                    furniture: { ...state.furniture, [category]: updatedCategory },
                    totalAmount: state.totalAmount - updatedProduct.price,
                };
            }
        }
        case CLEAR_BASKET: {
            return {
                ...state,
                furniture: {
                    barbells: [],
                    fastenings: [],
                    handles: [],
                    loops: [],
                    slidingSystems: [],
                    thresholds: [],
                    sealers: [],
                    profiles: [],
                },
                totalAmount: 0,
            };
        }
        default:
            return state;
    }
};

export default basketReducer;

export const addProductToBasket = (category, product) => {
    return {
        type: ADD_PRODUCT,
        payload: {
            category,
            product,
        },
    };
};

export const decreaseProductQuantity = (category, productName) => {
    return {
        type: DECREASE_PRODUCT_QUANTITY,
        payload: {
            category,
            productName,
        },
    };
};

export const clearBasket = () => {
    return {
        type: CLEAR_BASKET,
    };
};
