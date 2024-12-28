import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IBlog} from "../types";

export const blogAPI = createApi({
    reducerPath: 'blogAPI',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        fetchAllBlogs: build.query<IBlog[], ''>({
            query: () => ({
                url: `/blogs`
            }),
            transformResponse: (response: any): IBlog[] => {
                return response.data.map(((blog: any): IBlog => ({
                    id: blog.id,
                    title: blog.attributes.title,
                    pre_description: blog.attributes.pre_description,
                    description: blog.attributes.description,
                    text: blog.attributes.text,
                    meta_description: blog.attributes.meta_description,
                    meta_keys: blog.attributes.meta_keys
                })))
            }
        })
    })
});

export const {useFetchAllBlogsQuery} = blogAPI;