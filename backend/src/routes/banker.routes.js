import { Router } from 'express';
import { createLoanDetail } from '../controllers/banker.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();
router.post('/', authMiddleware, createLoanDetail);

export default router;