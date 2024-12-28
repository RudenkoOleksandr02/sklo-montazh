import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {portfolioAPI} from "../services/PortfolioService";
import {reviewsApi} from "../services/ReviewService";
import {blogAPI} from "../services/BlogService";
import {seoAPI} from "../services/SeoService";
import {questionAPI} from "../services/QuestionService";
import {furnitureAPI} from "../services/FurnitureService";
import {dollarToHryvniaAPI} from "../services/DollarToHryvnia";
import cartSlice from "./reducers/cartSlice";
import {showerApi} from "../services/ShowerService";
import {productApi} from "../services/ProductService";

const rootReducer = combineReducers({
    cart: cartSlice,
    [portfolioAPI.reducerPath]: portfolioAPI.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [blogAPI.reducerPath]: blogAPI.reducer,
    [seoAPI.reducerPath]: seoAPI.reducer,
    [questionAPI.reducerPath]: questionAPI.reducer,
    [furnitureAPI.reducerPath]: furnitureAPI.reducer,
    [dollarToHryvniaAPI.reducerPath]: dollarToHryvniaAPI.reducer,
    [showerApi.reducerPath]: showerApi.reducer,
    [productApi.reducerPath]: productApi.reducer
});
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(
                portfolioAPI.middleware,
                reviewsApi.middleware,
                blogAPI.middleware,
                seoAPI.middleware,
                questionAPI.middleware,
                furnitureAPI.middleware,
                dollarToHryvniaAPI.middleware,
                showerApi.middleware,
                productApi.middleware
            )
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];