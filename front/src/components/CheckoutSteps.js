import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.contact_information ? 'active' : ''}>Information</div>
      <div className={props.shipping_method ? 'active' : ''}>Livraison</div>
      <div className={props.payment_method ? 'active' : ''}>Paiement  </div>
    </div>
  );
}