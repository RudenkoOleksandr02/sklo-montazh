import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IMirrorCard, IMirrorPage} from "../types";

export const mirrorApi = createApi({
    reducerPath: "mirrorApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        fetchAllMirrors: build.query<IMirrorCard[], ''>({
            query: () => ({
                url: `/mirrors?populate=*`
            }),
            transformResponse: (response: any): IMirrorCard[] => {
                return response.data.map(((mirrorCard: any): IMirrorCard => {
                    const attr = mirrorCard.attributes;
                    const image = attr.images.data[0];
                    return {
                        id: mirrorCard.id,
                        name: attr.name,
                        pre_description: attr.pre_description,
                        price: attr.price,
                        image: {
                            id: image.id,
                            url: image.attributes.url,
                            alternativeText: image.attributes.alternativeText,
                        }
                    }
                }))
            }
        }),
        fetchShowerById: build.query<IMirrorPage, number>({
            query: (id) => ({
                url: `/showers/${id}?populate=*`
            }),
            transformResponse: (response: any): IMirrorPage => {
                const attr = response.data.attributes;

                return {
                    id: response.data.id,
                    name: attr.name,
                    images: attr.images.data.map((image: any) => ({
                        id: image.id,
                        url: image.attributes.url,
                        alternativeText: image.attributes.alternativeText,
                    })),
                    price: attr.price,
                    description: attr.description
                }
            }
        })
    })
})

export const {useFetchAllMirrorsQuery, useFetchShowerByIdQuery} = mirrorApi;