import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodsScreen() {
    return (
        <div>
            <CheckoutSteps contact_information shipping_method payment_method></CheckoutSteps>
            {/* <form  className="form" onSubmit={submitHandler}>
                <div>

                </div>
            </form> */}
        </div>
    )
}
