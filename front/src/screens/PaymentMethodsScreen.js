import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions';
import { payOrder } from '../actions/orderAction';
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox';
import TotalPrice from '../components/TotalPrice'
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import Stripe from '../Stripe';

export default function PaymentMethodsScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const cart = useSelector((state) => state.cart);
    const toPrice = (num) => Number(num.toFixed(2)); 
    const { shippingAddress } = cart;
    cart.shippingPrice = (cart.itemsPrice > 100 ? toPrice(0) : toPrice(10));
    if(!cart.shippingAddress) {
        props.history.push('/shipping_methods');
    }
    const userSignin = useSelector(state => state.userSignin);
     const {userInfo} = userSignin; 
    if(!userInfo){
        props.history.push('/signin')
    }
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    const {
      loading: loadingPay,
      error: errorPay,
      success: successPay,
    } = orderPay;
    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
          const { data } = await Axios.get('/api/config/paypal');
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
          script.async = true;
          script.onload = () => {
            setSdkReady(true);
          };
          document.body.appendChild(script);
        };
        if (!order || successPay || (order && order._id !== orderId)) {
          dispatch({ type: ORDER_PAY_RESET });
        //   dispatch(detailsOrder(orderId));
        } else {
          if (!order.isPaid) {
            if (!window.paypal) {
              addPayPalScript();
            } else {
              setSdkReady(true);
            }
          }
        }
      }, [dispatch, order, orderId, sdkReady, successPay]);

    const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder (order, paymentResult));
    };
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const submitHandler = (e) => {
        e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
    return (
        <div>
            <CheckoutSteps  shipping_method payment_method ></CheckoutSteps>
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
                                    <Link to="/shipping_methods"><i>Changer les informations</i></Link>
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
                                        <Link to="/shipping_methods"><i>Changer les informations</i></Link>
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
                            <div>
                                <input
                                type="radio"
                                id="paypal"
                                value="PayPal"
                                name="paymentMethod"
                                required
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor="paypal">PayPal</label>
                            {!order.isPaid && (
                            <li>
                                {!sdkReady ? (
                                <LoadingBox></LoadingBox>
                                ) : (
                                <PayPalButton
                                    amount={order.totalPrice}
                                    onSuccess={successPaymentHandler}
                                ></PayPalButton>
                                )}
                            </li>
              )}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                type="radio"
                                id="stripe"
                                value="Stripe"
                                name="paymentMethod"
                                required
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                ></input>
                                <label htmlFor="stripe">Stripe</label>
                                {/* <Stripe/> */}
                            </div>
                        </div>
                        <div>
                            <label />
                        </div>
                    </div>
                </div> 
                {/* <div className="step_footer">   
                    <Link to="/shipping_methods"><i class="fas fa-arrow-circle-left"></i>Retour aux informations utilisateur</Link>
                    <button className="button  payment-button" disabled={cart.cartItems.length=== 0} type="submit" onSubmit={submitHandler}>
                        Payer Maintenant
                    </button>
                </div> */}
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
