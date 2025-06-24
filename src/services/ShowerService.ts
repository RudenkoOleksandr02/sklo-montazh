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
                    const image = showerCard.images[0];
                    return {
                        id: showerCard.id,
                        documentId: showerCard.documentId,
                        name: showerCard.name,
                        article: showerCard.article,
                        numberHoles: showerCard.numberHoles,
                        furniturePrice: showerCard.furnitureColor[0].priceDollars, // 1 ---------
                        defaultHeight: showerCard.defaultHeight,
                        defaultWidth: showerCard.defaultWidth.map((width: any) => width.width), // 2 -------------
                        image: {
                            id: image.id,
                            url: image.url,
                            alternativeText: image.alternativeText,
                        }
                    }
                }))
            }
        }),
        fetchShowerById: build.query<IShowerPage, string>({
            query: (id) => ({
                url: `/showers/${id}?populate=*`
            }),
            transformResponse: (response: any): IShowerPage => {
                const data = response.data;

                return {
                    id: data.id,
                    name: data.name,
                    article: data.article,
                    description: data.description,
                    metaDescription: data.metaDescription,
                    metaKeys: data.metaKeys,
                    numberHoles: data.numberHoles,
                    furnitureColor: data.furnitureColor, // 1 --------------------
                    defaultHeight: data.defaultHeight,
                    defaultWidth: data.defaultWidth.map((width: any) => width.width), // 2 --------------
                    images: data.images.map((image: any) => ({
                        id: image.id,
                        url: image.url,
                        alternativeText: image.alternativeText,
                    })),
                }
            }
        }),
        fetchVariablesForShowers: build.query<IVariablesForShowers, ''>({
            query: () => ({
                url: `/variables-for-shower`
            }),
            transformResponse: (response: any): IVariablesForShowers => {
                const data = response.data;

                return {
                    ordinaryPrice: data.ordinaryPrice,
                    diamondPrice: data.diamondPrice,
                    graphitePrice: data.graphitePrice,
                    bronzePrice: data.bronzePrice,
                    mattePrice: data.mattePrice,
                    linearPrice: data.linearPrice,
                    holesPrice: data.holesPrice,
                    hardeningPrice: data.hardeningPrice
                }
            }
        })
    })
})

export const {useFetchAllShowersQuery, useFetchShowerByIdQuery, useFetchVariablesForShowersQuery} = showerApi;