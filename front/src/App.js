import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import  {Route, BrowserRouter, Link } from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import ShippingMethodScreen from './screens/ShippingMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin; 
  const dispatch = useDispatch();
  const signoutHandler =() =>{
    dispatch(signout());    
  }
  return (
  <BrowserRouter>
    <div className="grid-container">
        <header className="row">
        <div className="logo">
          <Link to="/"><img src="/images/mtp-logo-white.png" alt="logo" height="80px"/></Link>
        </div>

        <div className="nav-center">
          <ul>
            
            <Link to="/?query=vetements">Vetements</Link>
            <Link to="/?query=collections">Collections</Link>
            <Link to="/?query=chaises">Chaises</Link>
            <Link to="/?query=gaming">Gaming</Link>
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
                <div className="dropdown-item">
                <Link to="#">{userInfo.firstName}  <i className="fas fa-caret-down"></i></Link> 
                  <ul className="dropdown-content">
                  <li>
                      <Link to="/orderhistory">Historique des achats</Link>
                    </li>
                    <Link to="#signout" onClick={signoutHandler}>Deconnexion</Link>
                  </ul>
                </div>
              </div>
              ) : (
                <div className="nav-right">
                <Link to ="/register">Inscription</Link> <Link to ="/signin">Connexion</Link></div>
              )}
        </div>
      </header>
        
      <main> 
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <Route path="/placeOrder/:id/paid" component={PlaceOrderScreen}/>
        <Route path="/payment_methods/:id" component={PaymentMethodsScreen}/>
        <Route path="/shipping_methods" component={ShippingMethodScreen}/>
        <Route path="/register" component={RegisterScreen}/>
        <Route path="/signin" component={SigninScreen}/>
        <Route path="/cart/:id?"component={CartScreen}/>
        <Route path="/product/:id" component={ProductScreen}/>
        <Route path="/" component={HomeScreen} exact/>
        
      </main>
      <footer className="row center">
       Copyright © 2020 Montpellier Talent Players - <a href="/politique"> &nbsp;Politique de confidentialité   </a> &nbsp;- <a href="/mention"> &nbsp;Mentions légales</a>
      </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
