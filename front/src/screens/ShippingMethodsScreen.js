import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveShippingMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'
import TotalPrice from '../components/TotalPrice';

export default function ShippingMethodsScreen(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const toPrice = (num) => Number(num.toFixed(2)); 
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
if(!cart.shippingAddress) {
    props.history.push('/contact_information');
};
 const dispatch = useDispatch();
const shippingMethodsHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingMethod(...cart, cart.shippingAddress));
    props.history.push('/payment_methods');
  };
  
    return (
        <div>
            <CheckoutSteps contact_information shipping_method></CheckoutSteps>
           <div className="d_flex gap-20">
            <div className="step-sections">
                <div className="content-box">
                    <div className="review-block">
                    
                            <div className="block-label">
                            <h4>Contact :</h4> 
                            </div>
                            <div className="d_flex">
                                <div className="block-content">
                                     {cart.shippingAddress.email}
                                </div>
                                <div className="review-block_link">
                                    <Link to="/contact_information"><i>Changer les informations</i></Link>
                                </div>
                            </div>
                   
                    </div>
                    <div className="review-block">  
                        <div className="block-label"> 
                        <hr/>
                            <h4>Destinataire :</h4> 
                        </div>
                        <div className="d_flex">
                            <div className="block-content">
                                {cart.shippingAddress.address}, {cart.shippingAddress.postalCode} {cart.shippingAddress.city}, {cart.shippingAddress.country}
                            </div>
                            <div className="review-block_link">
                            <span>
                                <Link to="/contact_information"><i>Changer les informations</i></Link>
                                </span> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shipping-methods">
                    <div className="section_header">
                    
                        <h2>Méthode de livraison</h2>
                    </div>
                    <div className="content-box">
                        <div className="section_content">
                        <div className="radio_input"> 
                            <input type="checkbox" required ></input> 
                            
                            <span>	Frais de port fixes</span>
                            <th>Livraison: {cart.shippingPrice.toFixed(2)} €</th>
                        </div>

                      
                    </div>
                    </div>
                </div>
                <div className="step_footer">   
                  <Link to="/contact_information"><i className="fas fa-arrow-circle-left"></i>Retour aux informations utilisateur</Link>
                    <button className="button  payment-button" type="submit" onSubmit={shippingMethodsHandler}
                    disabled={cart.cartItems.length ===0}>
                        Moyen de paiement
                    </button>
                   
                </div>
            </div>
            <div className="sidebar">
                        <ul>
                            <div className="product-summary">
                                
                                
                                    { cart.cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row summary">
                                            <div>
                                            <img 
                                                src={item.image}
                                                alt={item.name} 
                                                className="small"/>
                                                
                                            </div>
                                            <span className="product-thumbnail__quantity"> {item.qty}</span> 
                                        
                                           <div className="min-30">
                                                {item.name}
                                            </div>  
                                            <div>
                                                {item.price.toFixed(2)} €
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </div>
                            <TotalPrice></TotalPrice>
                        </ul>
                </div>
            </div>  
        </div>
    )
}
