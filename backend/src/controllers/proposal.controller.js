import { query } from '../db.js';

export const createProposal = async (req, res) => {
  console.log('POST /api/proposals endpoint hit.');
  console.log('Request Body:', req.body);
  
  const { title, description, industry, fundingGoal } = req.body;
  const userId = req.user.id; 

  if (!title || !description) {
    console.warn('Validation failed: Missing title or description');
    return res.status(400).json({ msg: 'Please provide a title and description' });
  }

  try {
    console.log(`Inserting proposal for user ${userId}...`);
    const newProposal = await query(
      `INSERT INTO proposals (user_id, title, description, industry, funding_goal)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, title, description, industry, fundingGoal || 0]
    );

    console.log('Proposal created successfully!', newProposal.rows[0]);
    res.status(201).json({
      msg: 'Proposal created successfully!',
      proposal: newProposal.rows[0]
    });

  } catch (err) {
    console.error('!!! CRITICAL ERROR in createProposal !!!');
    console.error(err.message);
    console.error(err.stack);
    res.status(500).json({ msg: 'Server Error (check backend console)' });
  }
};

export const getAllProposals = async (req, res) => {
  console.log('GET /api/proposals endpoint hit.');
  try {
    const proposals = await query(
      `SELECT p.*, u.email
       FROM proposals p
       JOIN users u ON p.user_id = u.user_id
       ORDER BY p.created_at DESC`
    );

    console.log('Successfully fetched all proposals from DB.'); 
    res.status(200).json(proposals.rows);

  } catch (err) {
   
    console.error('!!! CRITICAL ERROR in getAllProposals !!!');
    console.error(err.message); 
    console.error(err.stack);   
    res.status(500).json({ msg: 'Server Error (check backend console)' });
  }
};