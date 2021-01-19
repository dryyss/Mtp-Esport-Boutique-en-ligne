import React from 'react';
import { Link } from 'react-router-dom';
import Note from './Note';

export default function Product({ product }) {
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <div className="img_product_height">
          <img className="medium" src={product.image} alt="product"/>
        </div>
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link> 
        <div className="price">{product.price.toFixed(2)} €</div>
        <Note note={product.note} numReviews={product.numReviews} />
      </div>
    </div>
    )
}
