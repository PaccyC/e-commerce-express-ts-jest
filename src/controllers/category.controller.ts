import { CreateCategory, UpdateCategory } from "../types/category";
import {Request,Response } from "express";
import createHttpError  from 'http-errors';
import { 
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
 } from "../services/category.service";
import { apiResponse } from "../utils/apiResponse";

export const createCategoryHandler = async(req:Request,res:Response)=>{
    const body = req.body as CreateCategory
    const data= await createCategory(body)
    
    res.json(apiResponse().success(201,data)).status(201)

}

export const getAllCategoriesHandler = async(req:Request,res:Response)=>{

    const data= await getCategories();
    res.json(apiResponse().success(200,data)).status(200)
}



export const getCategoryByIdHandler = async (req:Request,res:Response) =>{
    const  {id}  = req.params
    const data= await getCategoryById(id);

    if(!data) {
        res.json(apiResponse().error(createHttpError.NotFound("Category not found")));
    }

    res.json(apiResponse().success(201,data)).status(200);
}


export const updateCategoryHandler = async (req:Request,res:Response) =>{

    const {id}= req.params
    const body= req.body as UpdateCategory

    const data= await updateCategory(id,body);

    if (!data){
        res.json(apiResponse().error(createHttpError.NotFound("Category not found")));
    }

    res.json(apiResponse().success(200,data)).status(200);
}


export const deleteCategoryHandler = async (req:Request,res:Response) =>{

    const {id}= req.params
    
    await deleteCategory(id);

    res.json(apiResponse().success(204,{message: "Category deleted successfully"})).status(204)
}