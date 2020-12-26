import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps'
import TotalPrice from '../components/TotalPrice';

export default function ShippingMethodsScreen(props) {
    const cart = useSelector((state) => state.cart);
    const toPrice = (num) => Number(num.toFixed(2)); 
    cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const {cartItems, shippingAddress} = cart;
if(!cart.shippingAddress) {
    props.history.push('/payment_methods');
}
    return (
        <div>
            <CheckoutSteps contact_information shipping_method></CheckoutSteps>
            <div className="step-sections">
                <div className="review-block">
                    <div className="block-label">
                        Contact
                    </div>
                    <div className="block-content">
                        {cart.shippingAddress.email}
                    </div>
                    <div className="review-block_link">
                        <Link to="/contact_information" >Changer les informations</Link>
                    </div>
                </div>
                <div className="review-block">
                    <div className="block-label">
                        Destinataire
                    </div>
                    <div className="block-content">
                        {cart.shippingAddress.address}, {cart.shippingAddress.postalCode} {cart.shippingAddress.city}, {cart.shippingAddress.country}
                    </div>
                    <div className="review-block_link">
                       <span>
                           <Link to="/contact_information" >Changer les informations</Link>
                        </span> 
                    </div>
                </div>
                <div className="shipping-methods">
                    <div className="section_header">
                        <h2>Méthode de livraison</h2>
                    </div>
                    <div className="section_content">
                        <div className="radio_input"> 
                            <input type="checkbox"  />
                            <span>	Frais de port fixes</span>
                            <th>Livraison: { cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)}€</th>
                        </div>

                      
                    </div>
                </div>
                <div className="step_footer">   
                  <Link to="/contact_information">Retour aux informations utilisateur</Link>
                    <button className="button  payment-button" type="submit">
                        Passer à la méthode de paiement
                    </button>
                   
                </div>
            </div>
            <div className="sidebar">
                    <ul>
                    { cart.cartItems.map((item) => (
                        <li key={item.product}>
                            <div className="row">
                                <div>
                                <img 
                                    src={item.image}
                                    alt={item.name} 
                                    className="small"/>
                                </div>
                                <div className="min-30">
                                    {item.name}
                                </div>
                                <div>
                                    <span>Quantité: {item.qty}</span> 
                                </div>
                                <div>
                                    {item.price.toFixed(2)} €
                                </div>
                             </div>
                         </li>
                    ))}
                        <TotalPrice></TotalPrice>
                    </ul>
                </div>
        </div>
    )
}
