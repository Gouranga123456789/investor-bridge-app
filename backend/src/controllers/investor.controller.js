import { query } from '../db.js';

export const createInvestorProposal = async (req, res) => {
  const { title, description, industryFocus, minInvestment, maxInvestment } = req.body;
  const userId = req.user.id; 

  if (!title || !minInvestment || !maxInvestment) {
    return res.status(400).json({ msg: 'Please provide title, min, and max investment' });
  }

  try {
    const newProposal = await query(
      `INSERT INTO investor_proposals (user_id, title, description, industry_focus, min_investment, max_investment)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, title, description, industryFocus, minInvestment, maxInvestment]
    );

    res.status(201).json({
      msg: 'Investor proposal created successfully!',
      proposal: newProposal.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};