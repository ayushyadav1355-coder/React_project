import React from 'react';

function CategoryItem(props) {
  return (
    <div className="category-item">
      <div className="cat-icon">{props.icon}</div>
      <div className="cat-name">{props.name}</div>
    </div>
  );
}

export default CategoryItem;