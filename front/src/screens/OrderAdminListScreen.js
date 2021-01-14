import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import _get from 'lodash/get';

export default function OrderAdminListScreen(props) {
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listOrders());
    }, [dispatch]);
    const deleteHandler = (order) => {
      // TODO: delete handler
    };
  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <tbody>
          <>
              {orders.map((order) => (
                <tr key={order._id}>  
                  <ul className="search-result-items">
                    <li className="order-history-item">
                      <div className="order-history-header">
                        <div className="order-history-information">
                          <div className="order-number">
                            <span className="label">Numéro de commande : </span>
                            <span className="value">{order._id}</span>
                          </div>
                          <div className="order-date">
                             <span className="label">Date de la commande : </span>
                            <span className="value">{_get(order,'PaidAt','').substring(0, 10) }</span>
                          </div>
                          <div className="order-date">
                            <span className="label">Commande payée le : </span>
                            <span className="value">{_get(order,'PaidAt','').substring(0, 10) }</span>
                          </div>
                          <div className="order-status">
                            <span className="label">Statut de la commande : </span>
                            <span className="value order-dispatched">
                              {order.isDelivered
                                  ? order.deliveredAt.substring(0, 10)
                                : 'Non Livré'
                              }</span>
                          </div>
                        </div>
                  
                        <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/placeOrder/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onclick={() => deleteHandler(order)}
                  >
                    Supprimé
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
                  
          </tbody>
        </table>
      )}
    </div>
  );
}