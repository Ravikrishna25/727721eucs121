import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bearerToken, setBearerToken] = useState("");

  const productId = match.params.id; 

  useEffect(() => {
    const storedToken = localStorage.getItem('bearerToken');
    if (storedToken) {
      setBearerToken(storedToken);
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:8000/products/${productId}`, {
            bearerToken: bearerToken, 
          
          }); 
        setProduct(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]); 

  return (
    <div className="single-product">
      {isLoading && <p>Loading product details...</p>}
      {error && <p>Error: {error.message}</p>}
      {product && (
        <>
          <h2>{product.name}</h2> 
          <p>Price: ₹{product.price.toFixed(2)}</p>
        </>
      )}
      {!product && !isLoading && <p>No product found with ID: {productId}</p>}
    </div>
  );
};

export default SingleProduct;
