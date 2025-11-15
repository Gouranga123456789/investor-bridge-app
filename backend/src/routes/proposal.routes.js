import { Router } from 'express';
import { createProposal, getAllProposals } from '../controllers/proposal.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createProposal);

router.get('/', authMiddleware, getAllProposals); 

export default router;