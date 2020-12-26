import React from 'react'
import { useSelector } from 'react-redux';

export default function TotalPrice() {  
    const cart = useSelector((state) => state.cart);
    const toPrice = (num) => Number(num.toFixed(2)); 
    cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    return (
        <div>
            <li>           
                <th>Sous-Total: { cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)}€</th>
            </li>
            <li><th>Livraison: { cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)}€</th></li>
            <li>
                <th>Total:{cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice}€ </th>
            </li>
            <li>
                 <th>Dont {cart.taxPrice = toPrice(0.15 * cart.itemsPrice)}€ de Taxes </th>
            </li>
           
        </div>
    )
}
