import { CreateCategory, UpdateCategory } from "../types/category"
import Category from "../models/category"
import createHttpError from 'http-errors'
export const createCategory = async(data:CreateCategory) =>{

    const newCategory = await Category.create(data);
    return newCategory;
}

export const getCategories = async () =>{
     const categories= await Category.find();
     return categories;
}


export const getCategoryById = async(id:string) =>{

    const category = await Category.findById(id)

    if (!category) throw  createHttpError.NotFound(`Category with id ${id} not found`)
    return category;
}


export const updateCategory = async (id:string, data: UpdateCategory) =>{
    
      const updatedCategory= await Category.findByIdAndUpdate(id,data,{new: true})

      if(!updatedCategory) throw createHttpError.NotFound(`Category with id ${id} not found`)
      return updatedCategory;
}

export const deleteCategory = async (id:string) =>{

    const category = await Category.findById(id);
    if(!category) throw createHttpError.NotFound(`Category with id ${id} not found`)

        // Delete the category
    await Category.findByIdAndDelete(id);
    return {message: "Category deleted successfully"};
}