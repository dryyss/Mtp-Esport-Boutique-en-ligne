import React, { useEffect, useState } from 'react';
import{useDispatch, useSelector} from 'react-redux';
import Note from '../components/Note';
import {Link}  from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { detailsProduct } from '../actions/productActions';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1)
    const productDetails = useSelector(state => state.productDetails);
    const{ loading, error, product} = productDetails;
useEffect(() => {
  dispatch(detailsProduct(productId));
}, [dispatch, productId]);
const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
};

    return (
        <div>
        {loading? (
        <LoadingBox/> 
        ) : error ? ( 
        <MessageBox variant="danger">{error}</MessageBox>
        ):(
        <div>
            <Link to="/">Retour à la page d'accueil</Link>
        <div className="row top">
                <div className="col-2 ">
                  
                    <div> <img className="large" src={product.image} alt={product.name}></img></div>
                </div>  
                <div className="card">
                <div className="col-1">
                    <h1>{product.name}</h1>
                    <div className="price">
                        {product.price.toFixed(2)} €
                    </div>
                    <div className="description">
                        <div>{product.description}</div>    
                    </div>
                    <div> 
                        <Note   note={product.note}
                                numReviews={product.numReviews}
                        />
                    </div>
                
                <div className="actions-item">
                 { product.countInStock > 0 ? ( 
                      <div className="row">
                        <div>Quantité</div>
                        <div >
                            <select className="select select-cart " value={qty} onChange={e => setQty(e.target.value)}>
                                {
                                    [...Array(product.countInStock).keys()].map(
                                        (x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        )
                                    ) }
                            </select>
                        </div>
                    <div>
                        <button className="button  payment-button"
                            onClick={addToCartHandler}>
                            <span>
                                 Ajouter au Panier
                            </span> 
                        </button>
                    </div> 
                </div> 
                 ) : (
                    <span className="danger">Rupture de Stock</span>
                           
                   )}
            </div></div>
            </div>
        </div>
                {/* Todo: aria expanded */}
               
                 
          </div>)}
        </div>

    )
}



