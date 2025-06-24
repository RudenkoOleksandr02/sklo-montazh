import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IImage, IPortfolio} from "../types";

const getDataByCondition = (condition: any[]): IImage[] => {
    return condition.map((item: any): IImage => ({
        id: item.id,
        url: item.url,
        alternativeText: item.alternativeText
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
                const data = response.data;

                return {
                    shower_images: getDataByCondition(data.shower_images),
                    door_images: getDataByCondition(data.door_images),
                    partition_images: getDataByCondition(data.partition_images),
                    railing_images: getDataByCondition(data.railing_images),
                    photoPrinting_images: getDataByCondition(data.photoPrinting_images),
                    mirror_images: getDataByCondition(data.mirror_images),
                    shelf_images: getDataByCondition(data.shelf_images)
                }
            }
        })
    })
})

export const {useFetchShowerImagesQuery} = portfolioAPI;