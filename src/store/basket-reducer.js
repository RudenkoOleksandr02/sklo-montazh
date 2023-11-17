const initialState = {
    furniture: {
        furniture_barbells: [],
        furniture_fastenings: [],
        furniture_handles: [],
        furniture_loops: [],
        furniture_sliding_systems: [],
        furniture_thresholds: [],
        furniture_sealers: [],
        furniture_profiles: [],
        furniture_pendulum_systems: [],
        furniture_shelf_mounts: []
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
                (item) => item.id === product.id
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
            const { category, productId } = action.payload;
            const productIndex = state.furniture[category].findIndex(
                (item) => item.id === productId
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

            return state;
        }
        case CLEAR_BASKET: {
            return {
                ...state,
                furniture: {
                    furniture_barbells: [],
                    furniture_fastenings: [],
                    furniture_handles: [],
                    furniture_loops: [],
                    furniture_sliding_systems: [],
                    furniture_thresholds: [],
                    furniture_sealers: [],
                    furniture_profiles: [],
                    furniture_pendulum_systems: [],
                    furniture_shelf_mounts: []
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

export const decreaseProductQuantity = (category, productId) => {
    return {
        type: DECREASE_PRODUCT_QUANTITY,
        payload: {
            category,
            productId,
        },
    };
};

export const clearBasket = () => {
    return {
        type: CLEAR_BASKET,
    };
};
