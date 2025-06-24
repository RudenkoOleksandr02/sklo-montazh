import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IProductCard, IProductPage} from "../types";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        fetchAllProducts: build.query<IProductCard[], string>({
            query: (products) => ({
                url: `/${products}?populate[values][populate]=*`
            }),
            transformResponse: (response: any): IProductCard[] => {
                return response.data.map((productCard: any): IProductCard => {
                    const values = productCard.values;
                    const image = values.images[0];

                    return {
                        id: values.id,
                        documentId: productCard.documentId,
                        name: values.name,
                        pre_description: values.pre_description,
                        price: values.price,
                        image: {
                            id: image.id,
                            url: image.url,
                            alternativeText: image.alternativeText,
                        }
                    }
                })
            }
        }),
        fetchProductById: build.query<IProductPage, {products: string, id: string}>({
            query: ({products, id}) => ({
                url: `/${products}/${id}?populate[values][populate]=*`
            }),
            transformResponse: (response: any): IProductPage => {
                const values = response.data.values;

                return {
                    id: values.id,
                    name: values.name,
                    images: values.images.map((image: any) => ({
                        id: image.id,
                        url: image.url,
                        alternativeText: image.alternativeText,
                    })),
                    price: values.price,
                    description: values.description,
                    metaKeys: values.metaKeys,
                    metaDescription: values.metaDescription
                }
            }
        })
    })
})

export const {useFetchAllProductsQuery, useFetchProductByIdQuery} = productApi;