import React from 'react';
import { Link } from 'react-router-dom';
import Note from './Note';

export default function Product(props) {
  const{product} = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt="product"/>
      </Link>
     
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link> 
           <div className="price">{product.price.toFixed(2)} €</div>
     
          <Note note={product.note} numReviews={product.numReviews}></Note>
      
      </div>
    </div>
    )
}
