import { Category } from "./category";

export interface  Product{
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    price: number;
    image: string;
    category: Category;

}


export type  CreateProduct = Omit <
Product,
"_id" | "createdAt" | "updatedAt"
>


export type UpdateProduct = Partial <Omit <
Product,
"_id" | "createdAt" | "name" | "description" | "category"
>>