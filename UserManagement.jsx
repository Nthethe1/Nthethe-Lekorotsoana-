import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: ''
  });

  // Fetching users from the backend when the component loads
  useEffect(() => {
    axios.get('http://localhost:5003/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Handle input change in form fields
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (Add or Update user)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing user
      axios.put(`http://localhost:5003/users/${formData.id}`, formData)
        .then(() => {
          setUsers(users.map(user => user.id === formData.id ? formData : user));
          setFormData({ id: '', username: '', password: '' });
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      // Add new user
      axios.post('http://localhost:5003/users', formData)
        .then(response => {
          setUsers([...users, response.data]);
          setFormData({ id: '', username: '', password: '' });
        })
        .catch(error => console.error('Error adding user:', error));
    }
  };

  // Set the form fields to the selected user for editing
  const editUser = (user) => {
    setFormData(user);
  };

  // Delete user from the database
  const deleteUser = (id) => {
    axios.delete(`http://localhost:5003/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <button type="submit">{formData.id ? 'Update User' : 'Add User'}</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
