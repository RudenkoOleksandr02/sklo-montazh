import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IFurniture, IImage} from "../types";

export const furnitureAPI = createApi({
    reducerPath: 'FurnitureAPI',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        fetchFurnitureByParam: build.query<IFurniture[], string>({
            query: (name) => ({
                url: `/${name}?populate[values][populate]=*`
            }),
            transformResponse: (response: any): IFurniture[] => {
                return response.data.map((item: any): IFurniture => {
                    const values = item.values;

                    const images: IImage[] = values.images.map((img: any): IImage => ({
                        id: img.id,
                        url: img.url,
                        alternativeText: img.alternativeText
                    }))

                    return {
                        id: values.id,
                        name: values.name,
                        article: values.article,
                        priceDollars: values.priceDollars,
                        inStock: values.inStock,
                        images: images,
                        description: values.description
                    }
                })
            }
        })
    })
});

export const {useFetchFurnitureByParamQuery} = furnitureAPI;