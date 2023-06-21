import {categoryAPI} from "../api/api";

const SET_PRODUCTS = 'SET_PRODUCTS';
const DELETE_PRODUCTS = 'DELETE_PRODUCTS';

const initialState = {
    catalog: []
}
const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                catalog: action.payload
            }
        case DELETE_PRODUCTS:
            return {
                catalog: []
            }
        default:
            return state
    }
}
export default catalogReducer;

const deleteProducts = () => ({type: DELETE_PRODUCTS});
const setProducts = (payload) => ({type: SET_PRODUCTS, payload});
const replaceProducts = async (getProducts, dispatch) => {
    dispatch(deleteProducts());
    const data = await getProducts();
    dispatch(setProducts(data));
}
export const getShowers = () => async (dispatch) => {
    await replaceProducts(categoryAPI.getShowers, dispatch);
}
export const getMirrors = () => async (dispatch) => {
    await replaceProducts(categoryAPI.getMirrors, dispatch);
}
export const getDoors = () => async (dispatch) => {
    await replaceProducts(categoryAPI.getDoors, dispatch);
}
export const getPartitions = () => async (dispatch) => {
    await replaceProducts(categoryAPI.getPartitions, dispatch);
}
export const getPhotoPrintings = () => async (dispatch) => {
    await replaceProducts(categoryAPI.getPhotoPrintings, dispatch);
}
export const getRailings = () => async (dispatch) => {
    await replaceProducts(categoryAPI.getRailings, dispatch);
}
export const getShelves = () => async (dispatch) => {
    await replaceProducts(categoryAPI.getShelves, dispatch);
}
