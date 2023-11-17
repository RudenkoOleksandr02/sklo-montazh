import {getFurnitureAPI} from "../api/api";

const SET_FURNITURE = 'SET_FURNITURE';
const DELETE_FURNITURE = 'DELETE_FURNITURE';
const SET_LOADING = 'SET_LOADING';
const SET_LOADED = 'SET_LOADED';

const initialState = {
    furniture: [],
    isLoading: false
}

const furnitureReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FURNITURE:
            return {
                furniture: action.payload,
                isLoading: false
            }
        case DELETE_FURNITURE:
            return {
                furniture: [],
                isLoading: false
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case SET_LOADED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default furnitureReducer;

const deleteFurniture = () => {
    return {
        type: DELETE_FURNITURE
    }
}
const setFurniture = (payload) => ({type: SET_FURNITURE, payload});
const setLoading = () => {
    return {
        type: SET_LOADING
    }
}
const setLoaded = () => {
    return {
        type: SET_LOADED
    }
}

export const getFurniture = (type) =>  async (dispatch) => {
    try {
        dispatch(setLoading());
        deleteFurniture()
        const data = await getFurnitureAPI(type)
        dispatch(setFurniture(data));
    } catch (error) {
        console.error("Произошла ошибка при получении данных:", error);
    } finally {
        dispatch(setLoaded());
    }
}
