import {orderAPI} from "../api/api";

const ADD_CONTENT = 'ADD_CONTENT';

const initialState = {
    content: ''
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTENT:
            return {
                content: action.content
            }
        default:
            return state
    }
}

export default orderReducer;

const addContent = (content) => ({type: ADD_CONTENT, content});
export const getContent = () => async (dispatch) => {
    const content = await orderAPI.getContent();
    dispatch(addContent(content));
}