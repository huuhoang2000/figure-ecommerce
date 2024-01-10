// import React from 'react';
import PropTypes from 'prop-types';

const CheckboxFilter = ({ categories, handleCategoryChange, selectedCategories  }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      {categories && categories.map(category => (
        <div key={category}>
          <input
            type="checkbox"
            id={category}
            name={category}
            checked={selectedCategories[category] || false}
            onChange={handleCategoryChange}
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}
    </div>
  );
};

CheckboxFilter.propTypes = {
  categories: PropTypes.array.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  selectedCategories: PropTypes.object.isRequired,
};

export default CheckboxFilter;
