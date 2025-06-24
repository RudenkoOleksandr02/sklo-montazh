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
                return response.data.map((productCard: any): IProductCard => {
                    const image = productCard.images[0];

                    return {
                        id: productCard.id,
                        name: productCard.name,
                        pre_description: productCard.pre_description,
                        price: productCard.price,
                        image: {
                            id: image.id,
                            url: image.url,
                            alternativeText: image.alternativeText,
                        }
                    }
                })
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