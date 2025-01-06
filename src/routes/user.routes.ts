import express from 'express';
import asyncHandler from 'express-async-handler'
import { getAllUsersHandler, getAuthenticatedUser, getUserByIdHandler } from '../user/user.controller';
import { auth } from '../middleware/auth';

const router: express.Router = express.Router();

router.get("/me", auth,asyncHandler(getAuthenticatedUser))
router.get("/",asyncHandler(getAllUsersHandler))
router.get("/:id",asyncHandler(getUserByIdHandler))





export default router;