import { userInfo } from 'os'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signout } from '../actions/userActions';

export default function Header() {
    const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin; 
  const dispatch = useDispatch();
  
    const signoutHandler =() =>{
        dispatch(signout());    
      }
    return (
        <header className="row">
        <div className="logo">
          <Link to="/"><img src="/images/telechargement.png" alt="logo" height="80px"/></Link>
        </div>

        <div className="nav-center">
          <ul>
            
            <Link to="/vetements">Vetements</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/chaises">Chaises</Link>
            <Link to="/gaming">Gaming</Link>
          </ul>
        </div>
        <div className="nav-right">
          <Link to="/cart"><i className="fas fa-shopping-cart">{cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}</i> 
          </Link>
          {
            userInfo ?(
              <div className="dropdown user-dropdown">
              <Link to="#">{userInfo.name} <i className="fas fa-caret-down"></i></Link> 
                <ul className="dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>Deconnexion</Link>
                </ul>
              </div>
              ) : (
                <div className="nav-right">
                <Link to ="/register">Inscription</Link> <Link to ="/signin">Connexion</Link></div>
              )}
        </div>
      </header>
   
    )
}
