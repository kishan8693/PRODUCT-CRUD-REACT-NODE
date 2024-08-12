import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onSubmit,}) => {
  const [formData, setFormData] = useState(
    { name: '', description: '', price: '' }
  );

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({ name: product.name, description: product.description, price: product.price });
      setSelectedImage(null);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const {name,value} = e.target
    setFormData({ 
      ...formData,
      [name]:value
    });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    if (selectedImage) form.append('image', selectedImage);

    if (product) {
      await axios.put(`http://localhost:5000/products/${product._id}`, 
      form, { headers: { 'Content-Type': 'multipart/form-data' } });
    } else {
      await axios.post('http://localhost:5000/products', 
      form, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    onSubmit();
  };

  return (
    <>
  <form onSubmit={handleSubmit} className="container mt-4">
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Product Name</label>
    <input
      type="text"
      id="name"
      name="name"
      className="form-control"
      value={formData.name}
      onChange={handleInputChange}
      placeholder="Enter product name"
      required
    />
  </div>

  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <textarea
      id="description"
      name="description"
      className="form-control"
      value={formData.description}
      onChange={handleInputChange}
      placeholder="Enter product description"
      rows="3"
      required
    ></textarea>
  </div>

  <div className="mb-3">
    <label htmlFor="price" className="form-label">Price</label>
    <input
      type="number"
      id="price"
      name="price"
      className="form-control"
      value={formData.price}
      onChange={handleInputChange}
      placeholder="Enter product price"
      required
    />
  </div>

  <div className="mb-3">
    <label htmlFor="image" className="form-label">Product Image</label>
    <input
      type="file"
      id="image"
      onChange={handleImageChange}
      className="form-control"
    />
  </div>

  <div className="d-flex justify-content-between">
    <button type="submit" className="btn btn-primary">Save</button>
  </div>
</form>
<br/>
</>
  );
};

export default ProductForm;
