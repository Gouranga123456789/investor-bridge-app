import React, { useState } from 'react';
import axios from 'axios';

function PostLoan() {
  const [formData, setFormData] = useState({
    bankName: '',
    loanType: 'Business Loan',
    description: '',
    interestRate: '',
    maxAmount: '',
  });
  
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const { bankName, loanType, description, interestRate, maxAmount } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const res = await axios.post('http://localhost:5000/api/loans', formData);
      setMessage(res.data.msg);
      setIsError(false);
      setFormData({
        bankName: '',
        loanType: 'Business Loan',
        description: '',
        interestRate: '',
        maxAmount: '',
      });
    } catch (err) {
      setMessage(err.response?.data?.msg || 'An error occurred.');
      setIsError(true);
    }
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h2>Post Loan Details</h2>
      <p>Offer your financial products to businesses.</p>
      
      {message && (
        <p className={isError ? 'message message-error' : 'message message-success'}>
          {message}
        </p>
      )}
      
      <div className="form-group">
        <label htmlFor="bankName">Bank Name</label>
        <input type="text" name="bankName" value={bankName} onChange={onChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="loanType">Loan Type</label>
        <input type="text" name="loanType" value={loanType} onChange={onChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="interestRate">Interest Rate (%)</label>
        <input
          type="number"
          name="interestRate"
          value={interestRate}
          onChange={onChange}
          required
          step="0.01"
          placeholder="e.g., 5.25"
        />
      </div>
      <div className="form-group">
        <label htmlFor="maxAmount">Max Loan Amount ($)</label>
        <input
          type="number"
          name="maxAmount"
          value={maxAmount}
          onChange={onChange}
          required
          placeholder="e.g., 100000"
        />
      </div>
      <button type="submit" className="btn">Post Loan</button>
    </form>
  );
}

export default PostLoan;