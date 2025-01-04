export interface IService {
    title: string;
    description: string;
    path: string;
}
export interface IReview {
    id: number;
    user: string;
    text: string;
}
export interface IBlogTile {
    id: number;
    title: string;
    pre_description: string;
}
export interface IBlog {
    id: number;
    title: string;
    pre_description: string;
    description: string;
    text: string;
    meta_description: string;
    meta_keys: string;
}
export interface IQuestionAndAnswer {
    id: number;
    question: string;
    answer: string;
}
export interface IImage {
    id: number;
    url: string;
    alternativeText: null | string;
}
export interface IPortfolio {
    shower_images: IImage[],
    door_images: IImage[],
    partition_images: IImage[],
    railing_images: IImage[],
    photoPrinting_images: IImage[],
    mirror_images: IImage[],
    shelf_images: IImage[]
}
export interface ISeo {
    text: string;
    keywords: string;
    description: string;
}
export interface IFurniture {
    id: number;
    name: string;
    article: string;
    priceDollars: number;
    inStock: boolean;
    images: IImage[];
    description: string;
}
export interface IProduct {
    id: number | string;
    name: string;
    price: number;
    image: IImage;
    quantity: number;
    article?: string;
}
export interface IShowerCard {
    id: number;
    name: string;
    article: string;
    defaultHeight: number;
    defaultWidth: number[];
    priceOrdinary: number;
    image: IImage;
}
export interface IShowerPage {
    id: number;
    name: string;
    article: string;
    defaultHeight: number;
    defaultWidth: number[];
    description: string;
    metaKeys: string;
    metaDescription: string;
    priceOrdinary: number;
    priceDiamond: number;
    priceGraphite: number;
    priceBronze: number;
    images: IImage[];
    additionalOptions: {id: number; title: string; price: number}[];
}
export interface IProductCard {
    id: number;
    name: string;
    pre_description: string;
    price: number;
    image: IImage;
}
export interface IProductPage {
    id: number;
    name: string;
    description: string;
    price: number;
    images: IImage[];
    metaDescription: string;
    metaKeys: string;
}