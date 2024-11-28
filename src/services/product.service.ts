import Product from "../models/product";
import createHttpError from "http-errors";

import { CreateProduct, UpdateProduct } from "../types/product";
import Category from "../models/category";

export const getAllProducts = async() =>{

    const products = await Product.find().populate("category");
    return products;
}



export const createProduct = async (data:CreateProduct)=>{
    const newProduct= await Product.create(data);

    await Category.findByIdAndUpdate(
        newProduct.category,
        {$push: {products: newProduct._id}},
        {new:true}
    )
    return newProduct;
}


export const getProductById = async (id:string)=>{
    const product = await Product.findById(id).populate("category");

    if(!product) throw createHttpError.NotFound(`Product with id ${id} not found`);
    return product;
}

export const removeProduct = async (id:string)=>{
    const product = await Product.findById(id);

    if (!product) throw createHttpError.NotFound(`Product with id ${id} not found`);

    await product.deleteOne();
    return product;
}

export const updateProduct = async (id:string, data: UpdateProduct)=>{

    const product= await Product.findByIdAndUpdate(id,data,{new:true})

    if(!product) throw createHttpError.NotFound(`Product with id ${id} not found`);

    return product;
}