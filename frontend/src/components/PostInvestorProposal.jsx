import React, { useState } from 'react';
import axios from 'axios';

function PostInvestorProposal() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industryFocus: 'Technology',
    minInvestment: '',
    maxInvestment: '',
  });
  
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const { title, description, industryFocus, minInvestment, maxInvestment } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const res = await axios.post('http://localhost:5000/api/investor-proposals', formData);
      
      setMessage(res.data.msg);
      setIsError(false);
      setFormData({
        title: '',
        description: '',
        industryFocus: 'Technology',
        minInvestment: '',
        maxInvestment: '',
      });
      
    } catch (err) {
      setMessage(err.response?.data?.msg || 'An error occurred.');
      setIsError(true);
    }
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h2>Post Your Investment Offer</h2>
      <p>Let entrepreneurs know what you are looking to fund.</p>
      
      {message && (
        <p className={isError ? 'message message-error' : 'message message-success'}>
          {message}
        </p>
      )}
      
      <div className="form-group">
        <label htmlFor="title">Offer Title</label>
        <input type="text" name="title" value={title} onChange={onChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Describe your investment thesis, what you look for, etc."
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="industryFocus">Industry Focus</label>
        <select name="industryFocus" value={industryFocus} onChange={onChange}>
          <option value="Any">Any Industry</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Retail">Retail</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="minInvestment">Min Investment ($)</label>
        <input
          type="number"
          name="minInvestment"
          value={minInvestment}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="maxInvestment">Max Investment ($)</label>
        <input
          type="number"
          name="maxInvestment"
          value={maxInvestment}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit" className="btn">Post Offer</button>
    </form>
  );
}

export default PostInvestorProposal;