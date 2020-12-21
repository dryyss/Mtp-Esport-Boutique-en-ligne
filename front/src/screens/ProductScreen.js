import React, { useEffect } from 'react';
import{useDispatch, useSelector} from 'react-redux';
import Note from '../components/Note';
import {Link}  from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.productDetails);
    const{ loading, error, product} = productDetails;
useEffect(() => {
  dispatch(detailsProduct(productId));
}, [dispatch, productId])

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
                <div className="col-2">
                    <div> <img className="large" src={product.image} alt={product.name}></img></div>
                </div>
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
                </div>
                <div className="actions-item">
                    <div>
                        {product.countInStock >0? (
                            <button className="button cartButton">
                                <span>
                                    {product.price.toFixed(2)} € - Ajouter au Panier
                                </span> 
                            </button>
                            ) : (
                            <span className="danger">Rupture de Stock</span>
                            )}
                        </div> 
                  
            </div>
                </div>
                {/* Todo: aria expanded */}
               
                 
          </div>)}
        </div>

    )
}



