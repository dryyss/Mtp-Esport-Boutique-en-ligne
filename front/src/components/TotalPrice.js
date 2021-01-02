import React from 'react'
import { useSelector } from 'react-redux';

export default function TotalPrice() {  
    const cart = useSelector((state) => state.cart);
    const toPrice = (num) => Number(num.toFixed(2)); 
    cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = (cart.itemsPrice > 100 ? toPrice(0) : toPrice(10));
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    return (
        <div>
            <hr/>
            <li>           
                <th>Sous-Total: {cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0).toFixed(2)}€</th>
            </li>
            <li>
                <th>Livraison:{cart.shippingPrice.toFixed(2)}€</th>
            </li>
            <hr/>
            <li>
                <th>Total: {cart.totalPrice.toFixed(2)}€ </th>
            </li>
            <li>
                 <small>Dont {cart.taxPrice.toFixed(2)}€ de Taxes </small>
            </li>
           
        </div>
    )
}
