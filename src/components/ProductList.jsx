import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 8;

const ProductList = ({ selectedCategory, searchQuery }) => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchProducts(selectedCategory));
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (status === 'loading') return <div className="text-center mt-5">Loading...</div>;
  if (status === 'failed') return <div className="text-center mt-5 text-danger">{error}</div>;

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="mt-4">
      <h2 className="mb-4">
        {selectedCategory 
          ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
          : 'All Products'
        }
      </h2>
      {filteredProducts.length === 0 ? (
        <div className="text-center mt-5">
          <h3>No products found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {currentProducts.map(product => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;