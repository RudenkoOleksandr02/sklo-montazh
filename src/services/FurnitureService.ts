import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IFurniture, IImage} from "../types";

export const furnitureAPI = createApi({
    reducerPath: 'FurnitureAPI',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        fetchFurnitureByParam: build.query<IFurniture[], string>({
            query: (name) => ({
                url: `/${name}?populate=*`
            }),
            transformResponse: (response: any): IFurniture[] => {
                return response.data.map((item: any): IFurniture => {
                    const attr = item.attributes;
                    const images: IImage[] = attr.images.data.map((img: any): IImage => ({
                        id: img.id,
                        url: img.attributes.url,
                        alternativeText: img.alternativeText
                    }))

                    return {
                        id: item.id,
                        name: attr.name,
                        article: attr.article,
                        priceDollars: attr.priceDollars,
                        inStock: attr.inStock,
                        images: images,
                        description: attr.description
                    }
                })
            }
        })
    })
});

export const {useFetchFurnitureByParamQuery} = furnitureAPI;