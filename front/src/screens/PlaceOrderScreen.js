



import React, { useEffect } from 'react';
import _get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {deliverOrder,  detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET, ORDER_DETAILS_REQUEST,
} from '../constants/orderConstants';
 


export default function PlaceOrderScreen(props) {

        const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !order ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_DETAILS_REQUEST});
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, order, orderId,  successDeliver]);
  
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
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
                    <strong>  Votre commande a été expedié le :</strong> {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"> <strong> Votre commande est en cours de traitement</strong></MessageBox>
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
                  <strong> Payé le :</strong> {order.PaidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"> <strong> Commande Non Payé</strong></MessageBox>
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
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      </div>
  );
}

