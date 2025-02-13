import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemsCount } from '../store/cartSlice';
import { selectUser, login, logout } from '../store/authSlice';
import { selectDarkMode } from '../store/themeSlice';
import { toggleDarkMode } from '../store/themeSlice';
import { setSearchQuery, toggleSidebar } from '../store/uiSlice';
import { selectSearchQuery } from '../store/uiSlice';
import { GoogleLogin } from '@react-oauth/google';

const Navbar = () => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(selectCartItemsCount);
  const user = useSelector(selectUser);
  const darkMode = useSelector(selectDarkMode);
  const searchQuery = useSelector(selectSearchQuery);

  const handleLogin = (credentialResponse) => {
    dispatch(login(credentialResponse));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <button
          className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} d-md-none me-2`}
          onClick={() => dispatch(toggleSidebar())}
        >
          <i className="bi bi-list"></i>
        </button>
        <Link className="navbar-brand" to="/">E-Commerce Store</Link>
        <div className="d-flex align-items-center gap-2">
          <div className="d-none d-sm-block">
            <input
              type="search"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <img
                src={user.picture}
                alt={user.name}
                className="rounded-circle"
                style={{ width: '32px', height: '32px' }}
              />
              <button
                className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          )}
          <button
            className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
            onClick={() => dispatch(toggleDarkMode())}
          >
            <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
          </button>
          <Link to="/cart" className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} position-relative`}>
            <i className="bi bi-cart"></i>
            {cartItemsCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="container-fluid d-sm-none mt-2">
        <input
          type="search"
          className="form-control"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>
    </nav>
  );
};

export default Navbar;