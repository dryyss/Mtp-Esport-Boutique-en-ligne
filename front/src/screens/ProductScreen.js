import React from 'react'
import Note from '../components/Note';
import data from '../data';
import {Link}  from 'react-router-dom';

export default function ProductScreen(props) {
    const product = data.products.find((x) => x._id === props.match.params.id);
    if(!product) { 
   return <div className="text">
        <span>Erreur 404</span>
        <h2> Nous ne trouvons pas ce que vous recherchez.</h2>
        <a href="/">
            <span>Retour à la page d'accueil</span>
        </a> 
    </div>
    }
    return (
        <div>
            <Link to="/">Retour à la page d'accueil</Link>
        <div className="row top">
                <div className="col-2">
                    <div> <img className="large" src={product.image} alt={product.name}/></div>
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
                            <span className="error">Rupture de Stock</span>
                            )}
                        </div> 
                  
            </div>
                </div>
                {/* Todo: aria expanded */}
               
               
        </div>

    )
}



