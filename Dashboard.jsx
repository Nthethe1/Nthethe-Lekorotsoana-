import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Correct import for styles
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([
    '/Public/images/OIP.jpeg',
    '/Public/images/Banner.jpeg',
  ]);

  // Fetch products from backend on component mount
  useEffect(() => {
    axios.get('http://localhost:5003/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Prepare data for the bar chart
  const chartData = products.map(product => ({
    name: product.name,
    quantity: product.quantity,
  }));

  return (
    <div className="dashboard">
      <h2>Wings Cafe Inventory Dashboard</h2>

      {/* Image Carousel */}
      <div className="carousel-container">
        <Carousel autoPlay infiniteLoop interval={3000} showThumbs={false}>
          {images.map((image, index) => (
            <div key={index}>
              <img 
                src={image} 
                alt={`Slide ${index + 1}`} 
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Bar Chart for Stock Levels */}
      <h3>Current Stock Levels</h3>
      <div className="chart-container">
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Product Table */}
      <h3>Product Details</h3>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-message">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
