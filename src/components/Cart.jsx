import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, selectCartItems, selectCartTotal } from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (cart.length === 0) {
    return (
      <div className="container mt-3 text-center">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-3">
      <h2 className="mb-4">Shopping Cart</h2>
      <div className="row">
        <div className="col-12 col-lg-8 mb-4 mb-lg-0">
          {cart.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-4 col-md-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid p-2"
                    style={{ maxHeight: '150px', objectFit: 'contain' }}
                  />
                </div>
                <div className="col-8 col-md-9">
                  <div className="card-body">
                    <h5 className="card-title text-truncate">{item.title}</h5>
                    <p className="card-text fw-bold">${item.price}</p>
                    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
                      <select
                        className="form-select w-auto"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))
                        }
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3 fw-bold">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary w-100">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;