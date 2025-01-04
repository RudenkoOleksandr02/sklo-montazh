import emailjs from '@emailjs/browser';
import {IProduct} from "../types";

const SERVICE_ID: string = 'service_emk8qsh';
const PUBLIC_KEY: string = 'pdEXm-DmTqi493iQu';
const TEMPLATE_ID_basic: string = 'template_bta90ej';
const TEMPLATE_ID_forFurniture: string = 'template_bttyo57';

export const basicSendEmail = (name: string, phone: string, title?: string, orderTemplate?: any): void => {
    const templateParams = {
        name,
        phone,
        title: title ? title : 'Клієт бажає зв\'язатися',
        orderTemplate
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID_basic, templateParams, {
        publicKey: PUBLIC_KEY,
    });
}

export const forFurnitureSendEmail = (
    name: string,
    phone: string,
    products: IProduct[],
    generalPrice: number,
    delivery: string
): void => {
    let productsTable = `<table style="border-collapse: collapse; width: 100%;">
                                <tr>
                                    <th style="border: 1px solid #888; padding: 8px; background-color: #f2f2f2;">Назва</th>
                                    <th style="border: 1px solid #888; padding: 8px; background-color: #f2f2f2;">Артикул</th>
                                    <th style="border: 1px solid #888; padding: 8px; background-color: #f2f2f2;">Ціна</th>
                                    <th style="border: 1px solid #888; padding: 8px; background-color: #f2f2f2;">Кількість</th>
                                </tr>
                                ${products.map(product => {
                                    return `<tr>
                                        <td style="border: 1px solid #888; padding: 8px;">${product.name}</td>
                                        <td style="border: 1px solid #888; padding: 8px;">${product.article}</td>
                                        <td style="border: 1px solid #888; padding: 8px;">${product.price}</td>
                                        <td style="border: 1px solid #888; padding: 8px;">${product.quantity}</td>
                                    </tr>`;
                                })}
                           </table>`;
    const templateParams = {
        title: 'Фурнітура',
        productsTable,
        name,
        phoneNumber: phone,
        totalAmount: generalPrice,
        delivery
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID_forFurniture, templateParams, {
        publicKey: PUBLIC_KEY,
    });
}