import Axios from 'axios';
import _get from 'lodash/get';
import  { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CheckoutSteps from '../components/CheckoutSteps'
import TotalPrice from '../components/TotalPrice';
import { CART_EMPTY } from '../constants/cartConstants';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const GoBack = ({ click, text }) => (
  <div
    className="review-block_link"
    onClick={click}
    style={{
      cursor: 'pointer',
      fontStyle: 'italic',
      color: '#197dc1'
    }}
  >
    {text}
  </div>
);

export default function PaymentMethodsScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const history = useHistory();
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
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=EUR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order ||  (order && order._id !== orderId)) {
      dispatch(detailsOrder(orderId));
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
    if (successPay){
        dispatch({type:CART_EMPTY})
        props.history.push(`/orderConfirmation/${order._id}/paid`)
    }
  const HandleGoBack = () => {    
    dispatch({type: ORDER_CREATE_RESET})
    history.goBack()
    };
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
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
                            {_get(order,'shippingAddress.email',null) }
                        </div>
                        <GoBack click={HandleGoBack} text="Changer les informations" />
                    </div>
                </div>
                <div className="review-block">  
                    <div className="block-label"> 
                        <hr/>
                        <h4>Destinataire :</h4> 
                    </div>
                     <div className="d_flex">
                        <div className="block-content">
                            {_get(order,'shippingAddress.address',null) } ,{_get(order,'shippingAddress.postalCode',null) }, {_get(order,'shippingAddress.city',null) },{_get(order,'shippingAddress.country',null) }
                        </div>
                        <GoBack click={HandleGoBack} text="Changer les informations" />
                    </div>
                </div>
                <div className="review-block">  
                    <div className="block-label">   
                        <hr/>
                        <h4>Livraison</h4>
                    </div>
                    <div className="d_flex">
                        <div className="block-content">
                            <span><strong>Frais de port fixes</strong>:{_get(order,'shippingPrice',0.0).toFixed(2) }  €</span>
                        </div>    
                    </div>
                </div>
            </div>
                <div className="section-payment-method">
                    <div className="section-header">
                        <div className="section-title">
                            <h4>Paiement</h4>
                        </div>
                        <div className="section-text">
                            <p>Toutes les transactions sont sécurisées et cryptées.</p>
                        </div>
                        <div className="paypal_li">
                        {!order.isPaid && (
                         <li>
                            {!sdkReady ? (
                                <LoadingBox></LoadingBox>
                            ) : (
                                <>
                                {errorPay && (
                                    <MessageBox variant="danger">{errorPay}</MessageBox>
                                )}
                                {loadingPay && <LoadingBox></LoadingBox>}

                                <PayPalButton
                                  amount={order.totalPrice}
                                  onSuccess={successPaymentHandler}
                                  currency="EUR"
                                />
                                </>
                            )}
                        </li>
                    )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar">
                <ul>
                    <div className="product-summary">
                        { order.orderItems && order.orderItems.map((item) => (
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
                                     <div className="shipping-product-price">
                                        {item.price.toFixed(2)} €
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                    <TotalPrice></TotalPrice>
                    
                    </ul>
                </div>    
                     {/* <div className="step_footer">   
                             <Link to="/shipping_methods"><i class="fas fa-arrow-circle-left"></i>Retour aux informations utilisateur</Link>
                             <button className="button  payment-button" disabled={order.orderItems.length=== 0} type="submit" onSubmit={submitHandler}>
                                 Payer Maintenant
                             </button>
                     </div>  */}
            </div>
        </div> 
   );
 }
          