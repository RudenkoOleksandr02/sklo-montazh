import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IReview} from "../types";

export const reviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        fetchReviews: build.query<IReview[], ''>({
            query: () => ({
                url: '/reviews'
            }),
            transformResponse: (response: {data: any, meta: any}): IReview[] => {
                return response.data.map((item: any): IReview => ({
                    id: item.id,
                    user: item.attributes.name,
                    text: item.attributes.review,
                }))
            }
        })
    })
});

export const {useFetchReviewsQuery} = reviewsApi;