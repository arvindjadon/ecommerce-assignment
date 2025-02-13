import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/productsSlice';
import { selectDarkMode } from '../store/themeSlice';
import { setSelectedCategory, closeSidebar } from '../store/uiSlice';
import { selectSelectedCategory } from '../store/uiSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  const darkMode = useSelector(selectDarkMode);
  const selectedCategory = useSelector(selectSelectedCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(closeSidebar());
  };

  return (
    <div className={`${darkMode ? 'bg-dark' : 'bg-light'} p-3 h-100`}>
      <h4 className="mb-3">Categories</h4>
      <ul className="list-group">
        <li 
          className={`list-group-item ${darkMode ? 'bg-dark text-light' : ''} ${!selectedCategory ? 'active' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleCategorySelect(null)}
        >
          All Products
        </li>
        {categories.map(category => (
          <li 
            key={category} 
            className={`list-group-item ${darkMode ? 'bg-dark text-light' : ''} ${selectedCategory === category ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleCategorySelect(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;