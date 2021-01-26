import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import _get from 'lodash/get';
import { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderConfirmationScreen(props) {
  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading: loadingDetails, error: errorDetails } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    // loading: loadingPay,
    success: successPay,
  } = orderPay;

  useEffect(() => {
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, order, orderId, successPay]);

  return loadingDetails ? (
    <LoadingBox></LoadingBox>
  ) : errorDetails ? (
    <MessageBox variant="danger">{errorDetails}</MessageBox>
  ) : (
    <div>
    <CheckoutSteps  shipping_method payment_method  order_confirmation></CheckoutSteps>
    merci de votre achat
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {_get(order,'shippingAddress.firstName',null) }  {_get(order,'shippingAddress.lastName',null) } <br />
                  <strong>Address: </strong>
                  {_get(order,'shippingAddress.address',null) } &nbsp; 
                  {_get(order,'shippingAddress.postalCode','') } &nbsp;
                  {_get(order,'shippingAddress.city','') }  &nbsp;
                  {_get(order,'shippingAddress.country','') }
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.PaidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems && order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${_get(order,'itemsPrice',0.0).toFixed(2) }</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${_get(order,'shippingPrice',0.0).toFixed(2) }</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${_get(order,'taxPrice',0.0).toFixed(2) }</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${_get(order,'totalPrice',0.0).toFixed(2) }</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

