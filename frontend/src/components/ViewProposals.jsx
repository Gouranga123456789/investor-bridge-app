import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewProposals.css'; 

function ViewProposals() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get('http://localhost:5000/api/proposals');
        setProposals(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to fetch proposals');
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  if (loading) return <div className="loading-spinner">Loading proposals...</div>;
  if (error) return <p className="message message-error">{error}</p>;

  return (
    <div className="proposals-container">
      <h2>Browse Business Proposals</h2>
      <p>Here are the latest ideas from entrepreneurs.</p>
      
      <div className="proposals-grid">
        {proposals.length === 0 ? (
          <p>No proposals found.</p>
        ) : (
          proposals.map((proposal) => (
            <div className="proposal-card" key={proposal.proposal_id}>
              <h3>{proposal.title}</h3>
              <p className="card-industry">{proposal.industry}</p>
              <p className="card-description">{proposal.description.substring(0, 150)}...</p>
              <div className="card-footer">
                <span className="card-funding">
                  Goal: ${Number(proposal.funding_goal).toLocaleString()}
                </span>
                <span className="card-contact">{proposal.email}</span>
              </div>
              <button className="btn-view-details">View Details</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewProposals;