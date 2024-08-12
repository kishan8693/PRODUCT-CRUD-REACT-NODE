import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    setProducts(response.data);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts();
  };

  const handleSubmit = () => {
    fetchProducts();
    setEditingProduct(null);
  };

  return (
    <div>
      <h1 className=' text-center'>Product CRUD</h1>
      {editingProduct ? (
        <ProductForm product={editingProduct} onSubmit={handleSubmit} />
      ) : (
        <ProductForm onSubmit={handleSubmit} />
      )}
      <ul>
        {products.map(product => (
          <ProductItem
            key={product._id}
            product={product}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product._id)}
          />
        ))}
      </ul>
    </div>
    
  );
};

export default ProductList;
