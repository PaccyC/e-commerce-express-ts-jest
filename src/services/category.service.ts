import { CreateCategory, UpdateCategory } from "../types/category"
import Category from "../models/category"
import createHttpError from 'http-errors'
import Product from "../models/product";
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

    if (!category) throw  createHttpError.NotFound(`Category not found`)
    return category;
}


export const updateCategory = async (id:string, data: UpdateCategory) =>{
    
      const updatedCategory= await Category.findByIdAndUpdate(id,data,{new: true})

      if(!updatedCategory) throw createHttpError.NotFound(`Category not found`)
      return updatedCategory;
}

export const deleteCategory = async (id:string) =>{

    const category = await Category.findById(id);

    if(!category) throw createHttpError.NotFound(`Category not found`)



        // Delete the category
    await Category.deleteOne({_id:id});
    // Delete products in that category
    await Product.deleteMany({
            category: id 
         })
    return {message: "Category deleted successfully"};
}