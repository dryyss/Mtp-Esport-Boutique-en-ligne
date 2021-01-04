import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.shipping_method ? 'active' : ''}>Livraison</div>
      <div className={props.payment_method? 'active' : ''}>Facturation et Paiement</div>
      <div className={props.order_confirmation? 'active' : ''}>Confirmation de Commande</div>
    </div>
  );
}