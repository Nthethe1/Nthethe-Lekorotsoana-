import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: ''
  });

  // Fetch all products on component mount
  useEffect(() => {
    axios.get('http://localhost:5003/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update product if id is present
      axios.put(`http://localhost:5003/products/${formData.id}`, formData)
        .then(() => {
          setProducts(products.map(product => 
            product.id === formData.id ? formData : product
          ));
          resetForm();
        })
        .catch(error => console.error('Error updating product:', error));
    } else {
      // Add new product
      axios.post('http://localhost:5003/products', formData)
        .then(response => {
          setProducts([...products, response.data]);
          resetForm();
        })
        .catch(error => console.error('Error adding product:', error));
    }
  };

  // Reset form data after add or update
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: ''
    });
  };

  const editProduct = (product) => {
    setFormData(product);
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5003/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          placeholder="Name" 
          required 
        />
        <input 
          type="text" 
          name="description" 
          value={formData.description} 
          onChange={handleInputChange} 
          placeholder="Description" 
          required 
        />
        <input 
          type="text" 
          name="category" 
          value={formData.category} 
          onChange={handleInputChange} 
          placeholder="Category" 
          required 
        />
        <input 
          type="number" 
          name="price" 
          value={formData.price} 
          onChange={handleInputChange} 
          placeholder="Price" 
          required 
        />
        <input 
          type="number" 
          name="quantity" 
          value={formData.quantity} 
          onChange={handleInputChange} 
          placeholder="Quantity" 
          required 
        />
        <button type="submit">
          {formData.id ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.category} - ${product.price}
            <button onClick={() => editProduct(product)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
