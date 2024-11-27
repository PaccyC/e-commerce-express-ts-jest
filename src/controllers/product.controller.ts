import { apiResponse } from "../utils/apiResponse";
import { Request,Response } from 'express'
import { 
    getAllProducts,
    createProduct,
    getProductById,
    removeProduct,
    updateProduct

  } from "../services/product.service";
import { CreateProduct, UpdateProduct } from "../types/product";



export const getAllProductsHandler = async(req:Request,res:Response)=>{

    const data= await getAllProducts();
    
    res.json(apiResponse().success(data));
}

export const createProductHandler = async(req:Request,res:Response)=>{
    const body= req.body as CreateProduct
    const data= await createProduct(body);

    res.json(apiResponse().success(data))
}


export const getProductByIdHandler = async (req:Request,res:Response) =>{

    const {id}= req.params

    const data= await getProductById(id);

    res.json(apiResponse().success(data))
}


export const removeProductHandler = async (req:Request,res:Response) =>{
    const {id}= req.params

    const data= await removeProduct(id);

    res.json(apiResponse().success(data))
}

export const updateProductHandler = async(req:Request, res: Response)=>{
    const {id}= req.params
    const body= req.body as UpdateProduct

    const data= await updateProduct(id,body);

    res.json(apiResponse().success(data))
}