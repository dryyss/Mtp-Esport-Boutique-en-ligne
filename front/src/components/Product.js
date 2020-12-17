import React from 'react';
import Note from './Note';

export default function Product(props) {
  const{product} = props;
  return (
    <div key={product._id} className="card">
      <a href={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt="product"/>
      </a>
      <div className="card-body">
        <a href={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </a>
        <Note note={product.note} numReviews={product.numReviews}></Note>
      <div className="price">{product.price.toFixed(2)} €</div>
      </div>
    </div>
    )
}
