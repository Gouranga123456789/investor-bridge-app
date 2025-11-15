import { query } from '../db.js';

export const createLoanDetail = async (req, res) => {
  const { bankName, loanType, description, interestRate, maxAmount } = req.body;
  const userId = req.user.id;

  if (!bankName || !loanType || !interestRate || !maxAmount) {
    return res.status(400).json({ msg: 'Please fill all required fields' });
  }

  try {
    const newLoan = await query(
      `INSERT INTO loan_details (user_id, bank_name, loan_type, description, interest_rate, max_amount)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, bankName, loanType, description, interestRate, maxAmount]
    );

    res.status(201).json({
      msg: 'Loan detail posted successfully!',
      loan: newLoan.rows[0]
    });

  } catch (err)
 {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};