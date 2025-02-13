import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import {
  selectSelectedCategory,
  selectSearchQuery,
  selectIsSidebarOpen,
} from "./store/uiSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import CLIENT_ID from "./constants/clientId";

function App() {
  const selectedCategory = useSelector(selectSelectedCategory);
  const searchQuery = useSelector(selectSearchQuery);
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="container-fluid flex-grow-1">
            <div className="row h-100">
              <div
                className={`sidebar-container ${isSidebarOpen ? "show" : ""}`}
              >
                <Sidebar />
              </div>
              <div className="col-12 col-md-10 offset-md-2 main-content">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProductList
                        selectedCategory={selectedCategory}
                        searchQuery={searchQuery}
                      />
                    }
                  />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route
                    path="/order-confirmation"
                    element={<OrderConfirmation />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
