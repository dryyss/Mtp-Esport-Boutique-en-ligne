import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import _has from 'lodash/has';
import _get from 'lodash/get';
import { Link } from 'react-router-dom';


export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, orders} = orderMineList;

  const dispatch = useDispatch();
  const redirect = props.location.search
  ? props.location.search.split('=')[1]
  : '/orderHistory';

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
      !_has(userSignin, "userInfo.firstName") ? (
       <div><div>Connectez-vous pour visualiser l'historique de vos commandes </div> 
       <Link to={`/signin?redirect=${redirect}`}>Se Connecter</Link></div> 
      ) : (
        <div>
          <div className="js-orders-response order-history-wrapper" data-pagesize="6" data-pagestart="0">
            <h1 className="order-title">
              Historique des commandes
            </h1> {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {orders.map((order) => (
                <tr key={order._id}>  
                  <ul className="search-result-items">
                    <li className="order-history-item">
                      <div className="order-history-header">
                        <div className="order-history-information">
                          <div className="order-number">
                            <span className="label">Numéro de commande : </span>
                            <span className="value"><strong>{order._id}</strong></span>
                          </div>
                          <div className="order-date">
                            <span className="label">Date de la commande : </span>
                            <span className="value"><strong>{_get(order,'PaidAt','').substring(0, 10) }</strong></span>
                          </div>
                          <div className="order-status">
                            <span className="label">Statut de la commande : </span>
                            <span className="value order-dispatched">
                              {order.isDelivered
                                  ? <strong> Envoyer le  {order.deliveredAt.substring(0, 10)}</strong>
                                : 'Non Livré'
                              }</span>
                          </div>
                        </div>
                        <button type="button"
                          className="small"
                          onClick={() => {
                            props.history.push(`/placeOrder/${order._id}`);
                          }}>
                            Voir commande
                        </button>
                      </div>  
                      <div className="order-history-shipping">
                        <div className="order-shipped-to-wrapper">
                          <div className="order-shipped-to">Livrée à : </div>
                            <div className="order-shipped-to-name">
                              <span className="value">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</span>
                            </div>
                          </div>
                          <div className="order-history-total">
                            <div className="order-total-price">Total de la commande:</div>
                              <span className="value">  {order.totalPrice} €</span>
                            </div>
                          </div>
                    </li>
                  </ul>
                </tr>
              ))}
            </>
          )}
        </div>
      </div>
    )
  );
}