import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import thunkMiddle from 'redux-thunk';
import catalogReducer from "./catalog-reducer";
import productReducer from "./product-reducer";
import portfolioReducer from "./portfolio-reducer";
import orderReducer from './order-reducer';
import furnitureReducer from "./furniture-reducer";
import basketReducer from "./basket-reducer";

let reducers = combineReducers({
    catalog: catalogReducer,
    product: productReducer,
    portfolio: portfolioReducer,
    order: orderReducer,
    furniture: furnitureReducer,
    basket: basketReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddle)));

export default store;
