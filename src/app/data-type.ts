export interface signup{
    email: string,
    username: string,
    password: string
}
export interface login {
    email: string,
    password: string
}
export interface product {
    name: string,
    price: number,
    description: string,
    image: string,
    category: string,
    id: number,
    quantity: undefined | number
}
export interface cartProduct {
    name: string,
    price: number,
    description: string,
    image: string,
    category: string,
    id: number,
    quantity: number
}