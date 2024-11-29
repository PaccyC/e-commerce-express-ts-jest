import express from 'express';
import asyncHandler from 'express-async-handler'
import { getAuthenticatedUser } from '../user/user.controller';
import { auth } from '../middleware/auth';

const router: express.Router = express.Router();

router.get("/me", auth,asyncHandler(getAuthenticatedUser))







export default router;