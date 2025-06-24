import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";

export const dollarToHryvniaAPI = createApi({
    reducerPath: 'DollarToHryvniaAPI',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: build => ({
        fetchDollarToHryvnia: build.query<number, ''>({
            query: () => ({
                url: '/dollar-to-hryvnia'
            }),
            transformResponse: (response: {data: any, meta: any}): number => {
                return response.data.value
            }
        })
    })
})

export const {useFetchDollarToHryvniaQuery} = dollarToHryvniaAPI;