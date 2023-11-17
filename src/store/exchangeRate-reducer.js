import {getDollarExchangeRate} from "../api/api";

const initialState = {
    dollar_exchange_rate: 1
};

const ADD_EXCHANGE_RATE = 'ADD_EXCHANGE_RATE';

const exchangeRateReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXCHANGE_RATE:
            return {
                dollar_exchange_rate: action.payload
            }
        default:
            return state;
    }
}

export default exchangeRateReducer

const setExchangeRate = (payload) => ({type: ADD_EXCHANGE_RATE, payload})

export const getExchangeRate = () => async (dispatch)=> {
    const data = await getDollarExchangeRate()
    dispatch(setExchangeRate(data))
}