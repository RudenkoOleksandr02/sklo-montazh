const initialState = {
    barbells: [],
    fastenings: [],
    handles: [],
    loops: [],
    slidingSystems: [],
    thresholds: [],
    sealers: [],
    profiles: []
};

const ADD_PRODUCT = 'ADD_PRODUCT';
const DECREASE_PRODUCT_QUANTITY = 'DECREASE_PRODUCT_QUANTITY';
const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT: {
            const {category, product} = action.payload;
            const categoryIndex = state[category].findIndex(
                (item) => item.name === product.name
            );

            if (categoryIndex !== -1) {
                const updatedCategory = [...state[category]];
                updatedCategory[categoryIndex].quantity += 1;
                return {
                    ...state,
                    [category]: updatedCategory
                };
            } else {
                return {
                    ...state,
                    [category]: [...state[category], {...product, quantity: 1}]
                };
            }
        }
        case DECREASE_PRODUCT_QUANTITY: {
            const { category, productName } = action.payload;
            const productIndex = state[category].findIndex(
                (item) => item.name === productName
            );

            if (productIndex !== -1) {
                const updatedCategory = state[category].slice();
                const updatedProduct = { ...updatedCategory[productIndex] };

                if (updatedProduct.quantity > 1) {
                    updatedProduct.quantity -= 1;
                    updatedCategory[productIndex] = updatedProduct;
                } else {
                    updatedCategory.splice(productIndex, 1);
                }

                return {
                    ...state,
                    [category]: updatedCategory
                };
            }
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
            product
        }
    };
};

export const decreaseProductQuantity = (category, productName) => {
    return {
        type: DECREASE_PRODUCT_QUANTITY,
        payload: {
            category,
            productName
        }
    };
};
