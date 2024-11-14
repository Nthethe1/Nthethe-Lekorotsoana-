// src/components/Register.jsx
import React, { useState } from 'react';

// Simulating password hashing for demonstration purposes
const hashPassword = (password) => {
  return password.split('').reverse().join(''); // Simple reverse as a placeholder for hashing
};

const Register = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // Retrieve users from localStorage, defaulting to an empty array if null
    let users;
    try {
      users = JSON.parse(localStorage.getItem('users') || '[]');
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      users = []; // Default to an empty array on error
    }

    // Check if the username already exists
    if (users.some(u => u.username === username)) {
      setError('Username already exists');
      return;
    }

    // Store the hashed password
    const newUser = { id: Date.now().toString(), username, password: hashPassword(password) };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please log in.');
    onSwitch(); // Switch to login after successful registration
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          Register
        </button>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <p style={{ textAlign: 'center' }}>Already have an account? <button onClick={onSwitch}>Login</button></p>
    </div>
  );
};

export default Register;
