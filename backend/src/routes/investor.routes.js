import { Router } from 'express';
import { createInvestorProposal } from '../controllers/investor.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();
router.post('/', authMiddleware, createInvestorProposal);

export default router;