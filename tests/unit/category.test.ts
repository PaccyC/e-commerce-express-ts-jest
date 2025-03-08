import * as categoryService from "../../src/services/category.service"
import createHttpError from  'http-errors'
import categoryModel from "../../src/models/category"
import mongoose from "mongoose"



jest.mock("../../src/models/category")


beforeEach(async () => {
    jest.clearAllMocks();
})

describe('Get categories', () => {
    it('should get all categories', async() => {

        // Arrange
        const mockCategories =[ {_id: 1, name:"Category 1"}];
        (categoryModel.find as jest.Mock).mockResolvedValue(mockCategories);
    // Act
        const result= await categoryService.getCategories();

        // Assert
        expect(categoryModel.find).toHaveBeenCalled();
        expect(result).toHaveLength(1)

    })
    
})


describe('Get Category By Id', () => {
    it('should return a category if its Id is present', async() => {

        // Arrange
        const mockCategory = { _id:"1", name: "My Category"};
        (categoryModel.findById as jest.Mock).mockResolvedValue(mockCategory);

        // Act

        const result= await categoryService.getCategoryById(mockCategory._id);

        // Assert
        expect(categoryModel.findById).toHaveBeenCalledWith(mockCategory._id);
        expect(result).toEqual(mockCategory);
        
    })
    
    it('should throw an error if the ID of the category is not present', async() => {
        (categoryModel.findById as jest.Mock).mockResolvedValue(null);
        await expect(categoryService.getCategoryById("1")).rejects.toThrow(createHttpError.NotFound("Category not found"))
    })
})

describe('Update Category', () => {
    
    it('should update the category if its ID is present', async() => {
        // Arrange
        const updateData = {name:"My Product Category"};
        const mockCategory =  {_id:"1",...updateData};
        (categoryModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockCategory);

        // Act
        const result= await categoryService.updateCategory(mockCategory._id,updateData);

        // Assert
        expect(categoryModel.findByIdAndUpdate).toHaveBeenCalledWith(
            mockCategory._id,
          updateData,
          {new:true}
        );
        expect(result).toEqual(mockCategory);
    })

    it('should throw the notFound error if the ID of the category is not present', async() => {
        (categoryModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

        await expect(categoryService.updateCategory("1",{name:"My Category"}))
        .rejects.toThrow(createHttpError.NotFound("Category not found"))
    })
})

describe('Delete Category', () => {
   
    it("should throw the error if the category ID doesn't exist", async() => {
        (categoryModel.findById as jest.Mock).mockResolvedValue(null);

        await expect(categoryService.deleteCategory("1")).rejects.toThrow( createHttpError.NotFound("Category not found"))
    })
})