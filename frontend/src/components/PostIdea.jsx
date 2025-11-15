import React, { useState } from 'react';
import axios from 'axios';

function PostIdea() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: 'Technology',
    fundingGoal: '',
  });
  
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const { title, description, industry, fundingGoal } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in to post an idea.');
        setIsError(true);
        return;
      }

      // --- Set token in headers ---
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const body = JSON.stringify(formData);
      const API_URL = 'http://localhost:5000/api/proposals';
      
      const res = await axios.post(API_URL, body, config);
      
      setMessage(res.data.msg);
      setIsError(false);
      setFormData({ title: '', description: '', industry: 'Technology', fundingGoal: '' }); 
      
    } catch (err) {
      setMessage(err.response.data.msg || 'An error occurred.');
      setIsError(true);
    }
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h2>Post Your Business Idea</h2>
      
      {message && (
        <p className={isError ? 'message message-error' : 'message message-success'}>
          {message}
        </p>
      )}
      
      <div className="form-group">
        <label htmlFor="title">Proposal Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Detailed Description</label>
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="industry">Industry</label>
        <select name="industry" value={industry} onChange={onChange}>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Retail">Retail</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="fundingGoal">Funding Goal ($)</label>
        <input
          type="number"
          name="fundingGoal"
          placeholder="e.g., 50000"
          value={fundingGoal}
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn">Submit Proposal</button>
    </form>
  );
}

export default PostIdea;