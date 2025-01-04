import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IProductCard, IProductPage} from "../types";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        fetchAllProducts: build.query<IProductCard[], string>({
            query: (products) => ({
                url: `/${products}?populate=*`
            }),
            transformResponse: (response: any): IProductCard[] => {
                return response.data.map(((mirrorCard: any): IProductCard => {
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
        fetchProductById: build.query<IProductPage, {products: string, id: number}>({
            query: ({products, id}) => ({
                url: `/${products}/${id}?populate=*`
            }),
            transformResponse: (response: any): IProductPage => {
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
                    description: attr.description,
                    metaKeys: attr.metaKeys,
                    metaDescription: attr.metaDescription
                }
            }
        })
    })
})

export const {useFetchAllProductsQuery, useFetchProductByIdQuery} = productApi;