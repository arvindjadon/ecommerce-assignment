import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
      <div className="card h-100">
        <img src={product.image} className="card-img-top p-3" alt={product.title} style={{ height: '200px', objectFit: 'contain' }} />
        <div className="card-body">
          <h5 className="card-title text-truncate">{product.title}</h5>
          <p className="card-text">
            <span className="badge bg-secondary">{product.category}</span>
          </p>
          <p className="card-text fw-bold">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;