import React, { useEffect, useState } from 'react';

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [transaction, setTransaction] = useState({ productId: '', amount: 0 });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  // Handle input changes (product selection and amount)
  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  // Handle stock transaction (add or deduct)
  const handleTransaction = (type) => {
    const { productId, amount } = transaction;
    if (!productId || amount <= 0) {
      alert('Please select a product and enter a valid amount');
      return;
    }

    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        const newQuantity = type === 'add'
          ? product.quantity + parseInt(amount, 10)
          : product.quantity - parseInt(amount, 10);

        return { ...product, quantity: Math.max(newQuantity, 0) };  // Ensure quantity is never negative
      }
      return product;
    });

    // Update the state and localStorage
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setTransaction({ productId: '', amount: 0 });  // Reset form
  };

  return (
    <div>
      <h2>Stock Management</h2>

      {/* Product Selection Dropdown */}
      <select name="productId" onChange={handleTransactionChange} value={transaction.productId}>
        <option value="">Select Product</option>
        {products.map(product => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </select>

      {/* Amount Input */}
      <input
        type="number"
        name="amount"
        value={transaction.amount}
        onChange={handleTransactionChange}
        placeholder="Amount"
        min="1"  // Ensure only positive amounts can be entered
      />

      {/* Action Buttons for Add or Deduct Stock */}
      <button onClick={() => handleTransaction('add')}>Add Stock</button>
      <button onClick={() => handleTransaction('deduct')}>Deduct Stock</button>
    </div>
  );
};

export default StockManagement;
