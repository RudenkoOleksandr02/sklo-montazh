import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IImage, IPortfolio} from "../types";

const getDataByCondition = (condition: any[]): IImage[] => {
    return condition.map((item: any): IImage => ({
        id: item.id,
        url: item.attributes.url,
        alternativeText: item.attributes.alternativeText
    }))
}

export const portfolioAPI = createApi({
    reducerPath: 'portfolioAPI',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl + '/portfolio?populate=*'}),
    endpoints: (build) => ({
        fetchShowerImages: build.query<IPortfolio, ''>({
            query: () => ({
                url: ''
            }),
            transformResponse: (response: {data: any, meta: any}): IPortfolio => {
                const attributes = response.data.attributes;

                return {
                    shower_images: getDataByCondition(attributes.shower_images.data),
                    door_images: getDataByCondition(attributes.door_images.data),
                    partition_images: getDataByCondition(attributes.partition_images.data),
                    railing_images: getDataByCondition(attributes.railing_images.data),
                    photoPrinting_images: getDataByCondition(attributes.photoPrinting_images.data),
                    mirror_images: getDataByCondition(attributes.mirror_images.data),
                    shelf_images: getDataByCondition(attributes.shelf_images.data)
                }
            }
        })
    })
})

export const {useFetchShowerImagesQuery} = portfolioAPI;