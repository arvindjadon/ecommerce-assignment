import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (status === 'loading') return <div className="text-center mt-5">Loading...</div>;
  if (status === 'failed') return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!product) return <div className="text-center mt-5">Product not found</div>;

  return (
    <div className="container-fluid mt-3">
      <Link to="/" className="btn btn-outline-primary mb-4">
        &larr; Back to Products
      </Link>
      <div className="row product-details-container">
        <div className="col-12 col-md-6 product-image-container mb-4 mb-md-0">
          <img 
            src={product.image} 
            alt={product.title} 
            className="img-fluid product-image" 
          />
        </div>
        <div className="col-12 col-md-6 product-info-container">
          <h2 className="mb-3">{product.title}</h2>
          <p className="fs-4 fw-bold text-primary mb-3">${product.price}</p>
          <span className="badge bg-secondary mb-3">{product.category}</span>
          <p className="mb-4">{product.description}</p>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-primary"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;