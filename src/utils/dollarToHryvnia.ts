export const dollarToHryvnia = (price: number, exchange: number): number => {
    return Math.ceil(exchange * price);
}