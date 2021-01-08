import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
const dispatch = useDispatch()
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler =(id) =>{
     dispatch(removeFromCart(id));
    }
    const checkoutHandler =() => {
      props.history.push('/signin?redirect=shipping_methods');
    }
  return (
    <div className="row top">
      <div className="col-2 cart_items">  <div>
            <Link to="/">Retour à la page d'accueil</Link>
        </div>
        <h1>Panier({cartItems.length})</h1>
          {cartItems.length === 0?<MessageBox>
           <p>Le Panier est vide </p> 
            <Link   className="button payment-button" to="/"> Commencer vos achats</Link>
            </MessageBox> 
            :(
              
              <ul>
                <hr/>
                {
                  cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img 
                          src={item.image}
                           alt={item.name} 
                           className="small"/>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div>
                          <select className="select select-cart"
                          value={item.qty} 
                          onChange={e => 
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                         >
                            {
                                    [...Array(item.countInStock).keys()].map(
                                        (x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        )
                                    ) }
                         </select>
                        </div>
                        <div>
                          {item.price.toFixed(2)} €
                        </div>
                        <div>
                          <button type="button" onClick={() => removeFromCartHandler(item.product)}>Supprimé</button>
                        </div>
                      </div> <hr/>
                    </li> 
                  ))
               
                }
              </ul>
            )
            }
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Sous-Total ({cartItems.reduce((a,c) => a+c.qty, 0)} articles) 
              </h2>
            </li>
            <li>  {cartItems.reduce((a,c) => a+c.price *c.qty, 0).toFixed(2)} €</li>
            <li>
              <button type="button"
                onClick={checkoutHandler}
                className="button  payment-button" 
                disabled={cartItems.length ===0}>
                  Paiement
              </button>
            </li>
            <li>
              <p>Les taxes et les frais de livraison sont calculés lors du paiement.</p>
            </li>
            <li>
              <i><u>La disponibilité de l'article ne sera garantie qu'après le paiement.</u></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}