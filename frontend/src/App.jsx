import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './components/Home.jsx'; 
import ViewCategories from './components/ViewCategories.jsx'; 
import PostIdea from './components/PostIdea.jsx';
import ViewProposals from './components/ViewProposals.jsx';
import PostInvestorProposal from './components/PostInvestorProposal.jsx';
import PostLoan from './components/PostLoan.jsx';

import './App.css';

const PostInformation = () => <div className="form-container"><h2>Post Information Article</h2><p>This feature is coming soon.</p></div>;
const ViewQueries = () => <div className="form-container"><h2>View User Queries</h2><p>This feature is coming soon.</p></div>;


const CategoryPage = () => {
  return <h2>Viewing Proposals for a Specific Category</h2>;
};


function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/view-categories" element={<ProtectedRoute><ViewCategories /></ProtectedRoute>} />
          
          <Route path="/post-idea" element={<ProtectedRoute><PostIdea /></ProtectedRoute>} />
          <Route path="/view-proposals" element={<ProtectedRoute><ViewProposals /></ProtectedRoute>} />
          <Route path="/post-investor-proposal" element={<ProtectedRoute><PostInvestorProposal /></ProtectedRoute>} />
          <Route path="/post-loan" element={<ProtectedRoute><PostLoan /></ProtectedRoute>} />
          
          <Route path="/post-information" element={<ProtectedRoute><PostInformation /></ProtectedRoute>} />
          <Route path="/view-queries" element={<ProtectedRoute><ViewQueries /></ProtectedRoute>} />

          <Route path="/categories/:slug" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />

        </Routes>
      </main>
    </div>
  );
}

export default App;