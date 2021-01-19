import React, { useRef, useState } from 'react';
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
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { CATEGORY, SEARCH_QUERY } from './constants/routes';
import { gsap } from 'gsap';

function App() {
  const refMenu = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin; 
  const dispatch = useDispatch();
  const signoutHandler =() =>{
    dispatch(signout());    
  }
  const toggleMenu = () => {
    if (!menuIsOpen) {
      gsap
        .to([refMenu.current],{
          y: '5px',
          duration: 0.5
        })
    } else {
      gsap
        .to([refMenu.current], {
          y: '-200%',
          duration: 0.5
        })
    }
    setMenuIsOpen(!menuIsOpen);
  }

  return (
  <BrowserRouter>
    <div className="grid-container">
      {menuIsOpen ? (
        <div className="burger">
          <i className="fa fa-times" onClick={toggleMenu} />
        </div>
      ) : (
        <div className="burger">
          <i className="fa fa-bars" onClick={toggleMenu} />
        </div>
      )}
      <header className="row" >
        <div className="logo">
          <Link to="/"><img src="/images/mtp-logo-white.png" alt="logo" height="80px"/></Link>
        </div>
        
        <div className="row menu" ref={refMenu}>
          <div className="nav-center">
            <ul>
              <div className="dropdown user-dropdown">
                <div className="dropdown">  
                  <Link to={`/?${CATEGORY}=vetements`}>Vetements<i className="fas fa-caret-down"/></Link>   
                  <ul className="dropdown-content">
                    <li className="see_all">
                      <Link to="/see_all">Tout voir</Link>
                    </li>
                    <li>
                      <Link to="/tops">Hauts</Link>
                    </li>
                    <li>
                      <Link to="/bottoms">Bas</Link>
                    </li>
                    <li>
                      <Link to="/hoodies-jacket">Sweat et vestes</Link>
                    </li>
                    <li>
                      <Link to="/sportswear">Survetements</Link>
                    </li>
                    <li>
                      <Link to="/accesories">Accesoires</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="dropdown user-dropdown">
                <div className="dropdown-item">
                  <Link to={`/?${CATEGORY}=collections`}>Collections<i className="fas fa-caret-down"/></Link>
                  <ul className="dropdown-content">
                    <li className="see_all">
                      <Link to="/see_all">Tout voir</Link>
                    </li>
                    <li>
                      <Link to="/figures">Figurines</Link>
                    </li>
                    <li>
                      <Link to="/statues">Statues</Link>
                    </li>
                    <li>
                      <Link to="/plush">Peluches</Link>
                    </li>
                    <li>
                      <Link to="/accesories">Accesoires</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="dropdown user-dropdown">
                <div className="dropdown-item">
                  <Link to={`/?${CATEGORY}=chaises`}>Chaises<i className="fas fa-caret-down"/></Link>
                </div>
              </div>
              <div className="dropdown user-dropdown">
                <div className="dropdown-item">
                  <Link to={`/?${CATEGORY}=gaming`}>Gaming<i className="fas fa-caret-down"/></Link>
                  <ul className="dropdown-content">
                    <li className="see_all">
                      <Link to="/see_all">Tout voir</Link>
                    </li>
                    <li>
                      <Link to={`/?${CATEGORY}=chaises`}>Chaises</Link>
                    </li>
                    <li>
                      <Link to="/laptops">Tapis</Link>
                    </li>
                    <li>
                      <Link to="/mouses">Souris</Link>
                    </li>
                    <li>
                      <Link to="/keyboards">Claviers</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </ul>
          </div>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <div className="nav-right">
            <Link to="/cart"><i className="fas fa-shopping-cart">{cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}</i> 
            </Link>
         
            {userInfo ? (
              <div className="dropdown user-dropdown">
                <div className="dropdown-item">
                <Link to="#">{userInfo.firstName}  <i className="fas fa-caret-down"/></Link> 
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
                    Admin <i className="fa fa-caret-down"/>
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
        </div>
      </header>
        
      <main> 
      <Route path={`${SEARCH_QUERY}=:name`} component={SearchScreen} exact />
        <Route path="/placeOrder/:id" component={PlaceOrderScreen}/> 
        <Route path="/orderHistory" component={OrderHistoryScreen}/>
        <Route path="/orderConfirmation/:id/paid" component={OrderConfirmationScreen}/>
        <Route path="/payment_methods/:id" component={PaymentMethodsScreen}/>
        <Route path="/shipping_methods" component={ShippingMethodScreen}/>
        <Route path="/register" component={RegisterScreen}/>
        <Route path="/signin" component={SigninScreen}/>
        <Route path="/cart/:id?"component={CartScreen}/>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route path="/product/:id/edit" component={ProductEditScreen} exact />
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
        <i>Copyright © 2020 Montpellier Talent Players </i> 
        <Link to="/politique"> &nbsp;POLITIQUE DE CONFIDENTIALITÉ  </Link>
        <Link to="/legal-info"> &nbsp;POLITIQUE SUR LES COOKIES </Link>
        <Link to="/politique"> &nbsp;CONDITIONS D'UTILISATION </Link> 
        <Link to="/mention"> &nbsp;MENTIONS LÉGALES</Link>
      </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
