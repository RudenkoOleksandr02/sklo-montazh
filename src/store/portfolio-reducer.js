import {portfolioAPI} from "../api/api";

const ADD_PHOTOS = 'ADD_PHOTO';
const REMOVE_PHOTOS = 'REMOVE_PHOTOS'
const initialState = {
    gallery: []
}

const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PHOTOS:
            return {
                gallery: action.gallery
            }
        case REMOVE_PHOTOS:
            return {
                gallery: []
            }
        default:
            return state
    }
}

export default portfolioReducer;

const setPhotos = (gallery) => ({type: ADD_PHOTOS, gallery});
const removePhotos = () => ({type: REMOVE_PHOTOS})
export const getProductGallery = ({ id, limit, page }) => async (dispatch) => {
    dispatch(removePhotos());
    const gallery = await portfolioAPI.getGallery(id, limit, page);
    dispatch(setPhotos(gallery));
}
