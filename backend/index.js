import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import proposalRoutes from './src/routes/proposal.routes.js';
import investorRoutes from './src/routes/investor.routes.js';
import bankerRoutes from './src/routes/banker.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/investor-proposals', investorRoutes);
app.use('/api/loans', bankerRoutes); 

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});