// src/components/Login.jsx
import React, { useState } from 'react';

// Simulating password hashing for demonstration purposes
const hashPassword = (password) => {
  return password.split('').reverse().join(''); // Simple reverse as a placeholder for hashing
};

const Login = ({ onLogin, onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Safely get users from localStorage, defaulting to an empty array if none found
    let users;
    try {
      users = JSON.parse(localStorage.getItem('users') || '[]');
    } catch (parseError) {
      console.error("Error parsing users from localStorage:", parseError);
      users = []; // Set to empty array if parsing fails
    }

    // Hash the entered password
    const hashedPassword = hashPassword(password);
    const user = users.find(u => u.username === username && u.password === hashedPassword);

    if (user) {
      // Set the current user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      setError('');
      setLoading(false);
      onLogin(); // Trigger onLogin function after successful login
    } else {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }} 
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }} 
          />
        </label>
        <br />
        <button 
          type="submit" 
          disabled={loading} 
          style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <p style={{ textAlign: 'center' }}>Don't have an account? <button onClick={onSwitch}>Register</button></p>
    </div>
  );
};

export default Login;
