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
                const attributes = response.data.attributes;
                return {
                    text: attributes.text,
                    description: attributes.description,
                    keywords: attributes.keywords,
                }
            }
        }),
    })
});

export const {useFetchSeoQuery} = seoAPI;