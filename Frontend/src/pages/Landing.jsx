import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './Landing.css';

export function Landing() {
  const navigate = useNavigate();
  
  return (
    <div className="landing-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="app-title">Meal Planner</h1>
          <p className="app-description">Organize your recipes, create shopping lists, and plan your meals all in one place</p>
          <button className="cta-button" onClick={() => navigate('/Recipes')}>
            Get Started
          </button>
        </div>
      </header>
      
      <section className="features-section">
        <h2 className="section-title">Simplify Your Meal Planning</h2>
        
        <div className="feature-cards">
          <div className="feature-card" onClick={() => navigate('/Lists')}>
            <div className="card-icon">
              <ReceiptLongIcon fontSize="large" />
            </div>
            <h3 className="card-title">Shopping Lists</h3>
            <p className="card-description">Create and manage grocery lists that sync with your recipes</p>
          </div>
          
          <div className="feature-card" onClick={() => navigate('/Recipes')}>
            <div className="card-icon">
              <MenuBookIcon fontSize="large" />
            </div>
            <h3 className="card-title">Recipe Collection</h3>
            <p className="card-description">Store your favorite recipes and discover new ones</p>
          </div>
          
          <div className="feature-card" onClick={() => navigate('/Menus')}>
            <div className="card-icon">
              <CalendarMonthIcon fontSize="large" />
            </div>
            <h3 className="card-title">Meal Calendar</h3>
            <p className="card-description">Plan your meals for days or weeks in advance</p>
          </div>
        </div>
      </section>
      
      <footer className="landing-footer">
        <p>Your perfect meal planning companion</p>
      </footer>
    </div>
  );
}