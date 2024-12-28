import emailjs from '@emailjs/browser';

const SERVICE_ID: string = 'service_emk8qsh';
const PUBLIC_KEY: string = 'pdEXm-DmTqi493iQu';
const TEMPLATE_ID: string = 'template_bta90ej';

export const basicSendEmail = (name: string, phone: string, title?: string): void => {
    const templateParams = {
        name,
        phone,
        title: title ? title : 'Клієт бажає зв\'язатися'
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
    });
}