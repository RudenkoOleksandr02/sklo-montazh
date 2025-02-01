import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IShowerCard, IShowerPage, IVariablesForShowers} from "../types";

export const showerApi = createApi({
    reducerPath: "showerApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        fetchAllShowers: build.query<IShowerCard[], ''>({
            query: () => ({
                url: `/showers?populate=*`
            }),
            transformResponse: (response: any): IShowerCard[] => {
                return response.data.map(((showerCard: any): IShowerCard => {
                    const attr = showerCard.attributes;
                    const image = attr.images.data[0];
                    return {
                        id: showerCard.id,
                        name: attr.name,
                        article: attr.article,
                        numberHoles: attr.numberHoles,
                        furniturePrice: attr.furnitureColor[0].priceDollars,
                        defaultHeight: attr.defaultHeight,
                        defaultWidth: attr.defaultWidth.map((width: any) => width.width),
                        image: {
                            id: image.id,
                            url: image.attributes.url,
                            alternativeText: image.attributes.alternativeText,
                        }
                    }
                }))
            }
        }),
        fetchShowerById: build.query<IShowerPage, number>({
            query: (id) => ({
                url: `/showers/${id}?populate=*`
            }),
            transformResponse: (response: any): IShowerPage => {
                const attr = response.data.attributes;

                return {
                    id: response.data.id,
                    name: attr.name,
                    article: attr.article,
                    description: attr.description,
                    metaDescription: attr.metaDescription,
                    metaKeys: attr.metaKeys,
                    numberHoles: attr.numberHoles,
                    furnitureColor: attr.furnitureColor,
                    defaultHeight: attr.defaultHeight,
                    defaultWidth: attr.defaultWidth.map((width: any) => width.width),
                    images: attr.images.data.map((image: any) => ({
                        id: image.id,
                        url: image.attributes.url,
                        alternativeText: image.attributes.alternativeText,
                    })),
                }
            }
        }),
        fetchVariablesForShowers: build.query<IVariablesForShowers, ''>({
            query: () => ({
                url: `/variables-for-shower`
            }),
            transformResponse: (response: any): IVariablesForShowers => {
                const attr = response.data.attributes;

                return {
                    ordinaryPrice: attr.ordinaryPrice,
                    diamondPrice: attr.diamondPrice,
                    graphitePrice: attr.graphitePrice,
                    bronzePrice: attr.bronzePrice,
                    mattePrice: attr.mattePrice,
                    linearPrice: attr.linearPrice,
                    holesPrice: attr.holesPrice,
                    hardeningPrice: attr.hardeningPrice
                }
            }
        })
    })
})

export const {useFetchAllShowersQuery, useFetchShowerByIdQuery, useFetchVariablesForShowersQuery} = showerApi;