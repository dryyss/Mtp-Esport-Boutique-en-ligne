import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import TotalPrice from '../components/TotalPrice'

export default function PaymentMethodsScreen(props) {
    const cart = useSelector((state) => state.cart);
    const toPrice = (num) => Number(num.toFixed(2)); 
    cart.shippingPrice = (cart.itemsPrice > 100 ? toPrice(0) : toPrice(10));
if(!cart.shippingAddress) {
    props.history.push('/payment_methods');
}
    return (
        <div>
            <CheckoutSteps contact_information shipping_method payment_method></CheckoutSteps>
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
            
                    <div className="review-block">  
                            <div className="block-label">   
                            <hr/>
                            <h4>Livraison</h4>
                        </div>
                        <div className="d_flex">
                                <div className="block-content">
                                    <span><strong>Frais de port fixes</strong>: {cart.shippingPrice.toFixed(2)} €</span>
                                    
                                </div>
                            
                        </div>
                    </div>
                </div>
                <div className="section-payment-method">
                    <div className="section-header">
                        <div className="section-title">
                            <h2>Paiement</h2>
                        </div>
                        <div className="section-text">
                            <p>Toutes les transactions sont sécurisées et cryptées.</p>
                        </div>
                        <div>
                            choisir un moyen de paiement (stripe ou paypal )
                    
                        </div>
                    </div>
                </div> 
              <div className="step_footer">   
                  <Link to="/contact_information"><i class="fas fa-arrow-circle-left"></i>Retour aux informations utilisateur</Link>
                    <button className="button  payment-button" type="submit">
                        Payer Maintenant
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
