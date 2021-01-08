import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <div class="js-orders-response order-history-wrapper" data-pagesize="6" data-pagestart="0">
          <h1 class="order-title">
            Historique des commandes
          </h1>
          <div class="all-orders-total is-mobile">
            {/* 1 commande */}
            {/* Order lentgh for user */}
          </div>
          <form action="https://fr.boohoo.com/order-details" method="post" id="dwfrm_orders">
            <div class="search-result-options order-history-pagination">
            </div>
            <ul class="search-result-items">
              <li class="order-history-item">
                <div class="order-history-header">
                  <div class="order-history-information">
                    <div class="order-number">
                      <span class="label">Numéro de commande&nbsp;:</span>
                      <span class="value">EU109381354</span>
                    </div>
                    <div class="order-date">
                      <span class="label">Date de la commande&nbsp;:</span>
                        <span class="value">samedi, 05 décembre, 2020</span>
                    </div>
                    <div class="order-status">
                      <span class="label">Statut de la commande&nbsp;:</span>
                      <span class="value order-dispatched">Expédié</span>
                      <span class="notracking-text">
                      <span class="is-desktop notracking-text-hiphen"> - </span>
                        Le suivi n’est plus disponible
                      </span>
                    </div>
                  </div>
                  <button type="submit" class="order-details-btn" value="Détails de la commande" name="dwfrm_orders_orderlist_i0_show">
                  Voir commande
                  </button>
                </div>  
                <div class="order-history-shipping">
                  <div class="order-shipped-to-wrapper">
                    <div class="order-shipped-to">Livrée à&nbsp;:</div>
                    <div class="order-shipped-to-name">
                      <span class="value">Mr ANDRYS MAGAR</span>
                    </div>
                  </div>
                  <div class="order-history-total">
                    <div class="order-total-price">Total de la commande:</div>
                    <span class="value">  € 283.99</span>
                  </div>
                </div>
              </li>
            </ul>
          </form>
        </div>
    </div>
  );
}