import express from 'express';
import asyncHandler from 'express-async-handler'
import { 
    getAllProductsHandler,
    createProductHandler,
    updateProductHandler,
    removeProductHandler,
    getProductByIdHandler

} from '../controllers/product.controller';



const router: express.Router = express.Router();

router.get("/",asyncHandler(getAllProductsHandler))
router.post("/",asyncHandler(createProductHandler))
router.put("/edit/:id",asyncHandler(updateProductHandler))
router.delete("/delete/:id",asyncHandler(removeProductHandler))
router.get("/:id",asyncHandler(getProductByIdHandler))


export default router