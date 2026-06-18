import React from 'react';

function ProductCard(props) {
  return (
    <div className="product-card">
      <div className="prod-time">⏱️ {props.time}</div>
      <div className="prod-img">{props.img}</div>
      <div className="prod-name">{props.name}</div>
      <div className="prod-qty">{props.qty}</div>
      <div className="price-row">
        <div className="price">₹{props.price}</div>
        {/* Trigger the prop function and pass back the item's price */}
        <button className="add-btn" onClick={() => props.onAdd(props.price)}>
          ADD
        </button>
      </div>
    </div>
  );
}

export default ProductCard;