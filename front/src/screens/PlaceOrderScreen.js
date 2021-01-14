import React, { useEffect } from 'react'
import _has from 'lodash/has';
import _get from 'lodash/get';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



export default function PlaceOrderScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/placeOrder';

    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
      }, [props.history, redirect, userInfo]);
    return (
         !_has(userSignin, "userInfo.firstName") ? (
      <div>  <div>Connectez-vous pour visualiser votre commandes </div>
        <Link to={`/signin?redirect=${redirect}`}>Se Connecter</Link>
        </div>
    
      ) : (
      <div>           
            historique
        </div>
    )
    )
}
