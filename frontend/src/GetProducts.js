import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <span className="price">₹{product.price.toFixed(2)}</span>
    </div>
  );
};

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [bearerToken, setBearerToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('bearerToken');
    if (storedToken) {
      setBearerToken(storedToken);
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    const [bearerToken, setBearerToken] = useState(null);

  
    try {
      const { data } = await axios.post('http://localhost:8000/getprod', {
        bearerToken: bearerToken,
        company: 'AMZ',
        category: 'Phone',
        top: 10,
        min: 1,
        max: 10000,
      });

      setProducts(data);
    } catch (error) {
      setError(error);
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="products-container">
      {isLoading && <p>Loading products...</p>}
      {error && <p>Error: {error.message}</p>}
      
        {products.map(product => (
        <div key={product.id}>
          <h2>{product.productName}</h2>
          <p>Price: ₹{product.price.toFixed(2)}</p>
          <p>Rating: {product.rating}</p>
          <button >
            <Link to={`/product/${product.id}`}>
            View Details
            </Link>
          </button>
        </div>
      ))}
    
      {products.length === 0 && !isLoading && <p>No products found.</p>}
    </div>
  );
};

export default GetProducts;
