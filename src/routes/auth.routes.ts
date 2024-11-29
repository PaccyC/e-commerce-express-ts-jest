import express from 'express';
import asyncHandler from 'express-async-handler'
import { registerUserHandler, signInUserHandler } from '../auth/auth.controller';



const router:express.Router = express.Router();


router.post("/signup",asyncHandler(registerUserHandler));
router.post("/signin",asyncHandler(signInUserHandler))

export default router;