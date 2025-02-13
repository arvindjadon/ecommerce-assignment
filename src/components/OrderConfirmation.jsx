import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="card p-5">
        <h2 className="text-success mb-4">Order Confirmed!</h2>
        <p className="mb-4">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;