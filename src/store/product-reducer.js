import {productAPI} from "../api/api";

const SET_PRODUCT = 'SET_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

const initialState = {
    mainImage: null,
    otherImage: null,
    name: '',
    price: null,
    article: null,
    pre_description: '',
    description: '',
    meta_description: '',
    meta_keys: ''
}



const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            const {name, price, article, description, pre_description, mainImage, otherImage, meta_description, meta_keys} = action.product
            return {
                name,
                price,
                article,
                description,
                pre_description,
                mainImage,
                otherImage,
                meta_description,
                meta_keys
            }
        case REMOVE_PRODUCT:
            return {
                mainImage: null,
                otherImage: null,
                name: '',
                price: null,
                article: null,
                pre_description: '',
                description: '',
                meta_description: '',
                meta_keys: ''
            }
        default:
            return state
    }
}

export default productReducer;
const setProduct = (product) => ({type: SET_PRODUCT, product});
const removeProduct = () => ({type: REMOVE_PRODUCT})
export const getProduct = (id, category) => async (dispatch) => {
    try {
        dispatch(removeProduct())
        const payload = await productAPI.getProduct(id, category);
        dispatch(setProduct(payload));
    } catch(error) {
        console.error("Произошла ошибка при получении продукта:", error);
    }
}