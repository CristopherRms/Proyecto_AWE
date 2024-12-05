export interface Product {
    _id:string;
    title: string;
    price: number;
    description: string;
    category: string;
    tallas:string[];
    images: string[]; 
}