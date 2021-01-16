import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {Route, BrowserRouter, Link } from 'react-router-dom';
import { signout } from './actions/userActions';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import ShippingMethodScreen from './screens/ShippingMethodScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductAdminListScreen from './screens/ProductAdminListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderAdminListScreen from './screens/OrderAdminListScreen';
import UserAdminListScreen from './screens/UserAdminListScreen';
import UserEditScreen from './screens/UserEditScreen';

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
                      <Link to="/orderHistory">Historique des achats</Link>
                    </li>
                    <li>
                      <Link to="/profile">Mon Compte</Link>
                    </li>
                    <Link to="#signout" onClick={signoutHandler}>Deconnexion</Link>
                  </ul>
                </div>
              </div>
              ) : (
                <div className="nav-right">
                  <Link to ="/register">Inscription</Link>
                   <Link to ="/signin">Connexion</Link>
                </div>
              )}
              {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                  </ul>
                </div>
              )}
        </div>
      </header>
        
      <main> 
        <Route path="/placeOrder/:id" component={PlaceOrderScreen}/> 
        <Route path="/orderHistory" component={OrderHistoryScreen}/>
        <Route path="/orderConfirmation/:id/paid" component={OrderConfirmationScreen}/>
        <Route path="/payment_methods/:id" component={PaymentMethodsScreen}/>
        <Route path="/shipping_methods" component={ShippingMethodScreen}/>
        <Route path="/register" component={RegisterScreen}/>
        <Route path="/signin" component={SigninScreen}/>
        <Route path="/cart/:id?"component={CartScreen}/>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
        <Route path="/" component={HomeScreen} exact/>
        <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
           <AdminRoute
            path="/productlist"
            component={ProductAdminListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderAdminListScreen}
          ></AdminRoute>
          <AdminRoute 
            path="/userlist" 
            component={UserAdminListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

      </main>
      <footer className="row center">
       Copyright © 2020 Montpellier Talent Players - <a href="/politique"> &nbsp;Politique de confidentialité   </a> &nbsp;- <a href="/mention"> &nbsp;Mentions légales</a>
      </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
