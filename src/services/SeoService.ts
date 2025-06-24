import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {ISeo} from "../types";

export const seoAPI = createApi({
    reducerPath: 'seoAPI',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        fetchSeo: build.query<ISeo, string>({
            query: (url) => ({
                url
            }),
            transformResponse: (response: any): ISeo => {
                const data = response.data;
                return {
                    text: data.text,
                    description: data.description,
                    keywords: data.keywords,
                }
            }
        }),
    })
});

export const {useFetchSeoQuery} = seoAPI;