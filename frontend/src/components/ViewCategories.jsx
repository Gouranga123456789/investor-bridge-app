import React from 'react';
import { Link } from 'react-router-dom';
import './ViewCategories.css';
const categories = [
  { name: 'Technology', icon: '💻', slug: 'technology' },
  { name: 'Healthcare', icon: '🩺', slug: 'healthcare' },
  { name: 'Finance', icon: '💸', slug: 'finance' },
  { name: 'Education', icon: '🎓', slug: 'education' },
  { name: 'Retail', icon: '🛍️', slug: 'retail' },
  { name: 'Real Estate', icon: '🏘️', slug: 'real-estate' },
  { name: 'Entertainment', icon: '🎬', slug: 'entertainment' },
  { name: 'Food & Beverage', icon: '🍔', slug: 'food-beverage' },
];

function ViewCategories() {
  return (
    <div className="category-container">
      <h2>Browse Business Categories</h2>
      <p>Find proposals based on their industry.</p>
      
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to={`/categories/${category.slug}`} 
            className="category-card"
            key={category.slug}
          >
            <span className="category-icon">{category.icon}</span>
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ViewCategories;