import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 
import './Navbar.css';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  const renderRoleLinks = () => {
    if (!user) return null;

    switch (user.role) {
      case 'Business':
        return <Link to="/post-idea">Post Idea</Link>;
      case 'Investor':
        return (
          <>
            <Link to="/view-proposals">View Proposals</Link>
            <Link to="/post-investor-proposal">Post Investment Offer</Link>
          </>
        );
      case 'Banker':
        return <Link to="/post-loan">Post Loan Details</Link>;
      case 'Advisor':
        return (
          <>
            <Link to="/post-information">Post Information</Link>
            <Link to="/view-queries">View Queries</Link>
          </>
        );
      case 'User':
        return <Link to="/view-categories">View Categories</Link>;
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          InvestorBridge
        </Link>
        <div className="navbar-links">
          {isAuthenticated ? ( 
            <>
              <Link to="/dashboard">Dashboard</Link>
              {renderRoleLinks()}
              <button onClick={handleLogout} className="nav-btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;