import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";
import "./index.css";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51HlyLuHE8iuSSTSnWLBeai55SqRHp2OPwoRpGHTiTGUxpQsSGuxXtK5Dwz096e10GeLu9Q5HKE6rOghZlOrrpBUd00F0CUzkxL");
export default function Stripe() {
  return (
    <div className="Stripe">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}