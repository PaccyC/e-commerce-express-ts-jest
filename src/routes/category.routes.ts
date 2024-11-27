import express from 'express'

import asyncHandler from 'express-async-handler'
const router: express.Router = express.Router();
import { 
    createCategoryHandler,
    deleteCategoryHandler,
    getAllCategoriesHandler,
    getCategoryByIdHandler,
    updateCategoryHandler
 } from '../controllers/category.controller';

router.post("/",asyncHandler(createCategoryHandler))
router.get("/",asyncHandler(getAllCategoriesHandler))
router.put("/edit/:id",asyncHandler(updateCategoryHandler))
router.delete("/delete:/id",asyncHandler(deleteCategoryHandler))
router.get("/:id",asyncHandler(getCategoryByIdHandler))

export default router;