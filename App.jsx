// src/App.jsx
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import StockManagement from './StockManagement';
import UserManagement from './UserManagement';
import Login from './Login';
import Register from './Register';
import './index.css';

function App() {
  const [activeSection, setActiveSection] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsAuthenticated(true);
      setActiveSection('dashboard'); // Automatically navigate to dashboard if already logged in
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    setActiveSection('login');
  };

  return (
    <div className="App">
      <header>
        <marquee behavior="" direction="right"><h1>Wings Cafe Inventory System</h1></marquee>
        {isAuthenticated && (
          <nav>
            <button onClick={() => setActiveSection('dashboard')}>Dashboard</button>
            <button onClick={() => setActiveSection('productManagement')}>Product Management</button>
            <button onClick={() => setActiveSection('stockManagement')}>Stock Management</button>
            <button onClick={() => setActiveSection('userManagement')}>User Management</button>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        )}
      </header>

      <main>
        {isAuthenticated ? (
          activeSection === 'dashboard' ? (
            <Dashboard />
          ) : activeSection === 'productManagement' ? (
            <ProductManagement />
          ) : activeSection === 'stockManagement' ? (
            <StockManagement />
          ) : (
            <UserManagement />
          )
        ) : (
          activeSection === 'login' ? (
            <Login onLogin={handleLogin} onSwitch={() => setActiveSection('register')} />
          ) : (
            <Register onSwitch={() => setActiveSection('login')} />
          )
        )}
      </main>
    </div>
  );
}

export default App;
