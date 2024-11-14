const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
const port = 5003;

// Middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Parse JSON bodies

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Nthethe',  // Use your MySQL username
  password: '123456',  // Use your MySQL password
  database: 'wings_cafe'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    process.exit(1);
  }
  console.log('Connected to the MySQL database');
});

// Product Routes

// Get all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
    } else {
      res.json(results);
    }
  });
});

// Get product by ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      res.status(500).send('Error fetching product');
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new product
app.post('/products', (req, res) => {
  const { name, description, category, price, quantity } = req.body;
  const query = 'INSERT INTO products (name, description, category, price, quantity) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, description, category, price, quantity], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      res.status(500).send('Error adding product');
    } else {
      res.status(201).json({ id: result.insertId, name, description, category, price, quantity });
    }
  });
});

// Update product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, quantity } = req.body;
  const query = 'UPDATE products SET name = ?, description = ?, category = ?, price = ?, quantity = ? WHERE id = ?';
  db.query(query, [name, description, category, price, quantity, id], (err) => {
    if (err) {
      console.error('Error updating product:', err);
      res.status(500).send('Error updating product');
    } else {
      res.send('Product updated');
    }
  });
});

// Delete product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).send('Error deleting product');
    } else {
      res.send('Product deleted');
    }
  });
});

// User Routes

// Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
    } else {
      res.json(results);
    }
  });
});

// Create a new user
app.post('/users', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Error creating user');
    } else {
      res.status(201).json({ id: results.insertId, username, password });
    }
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const query = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
  db.query(query, [username, password, id], (err) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Error updating user');
    } else {
      res.send('User updated');
    }
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
    } else {
      res.send('User deleted');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
