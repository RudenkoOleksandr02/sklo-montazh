import {furnitureAPI} from "../api/api";

const SET_FURNITURE = 'SET_FURNITURE';

const initialState = {
    furniture: []
}

const furnitureReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FURNITURE:
            return {
                furniture: action.payload
            }
        default:
            return state
    }
}

export default furnitureReducer;

const setFurniture = (payload) => ({type: SET_FURNITURE, payload});

export const getFurniture = () => async (dispatch) => {
    const data = await furnitureAPI.getFurniture();
    dispatch(setFurniture(data));
}

