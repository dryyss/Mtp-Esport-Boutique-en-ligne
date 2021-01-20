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
import Header from './components/Header';
import Footer from './components/Footer';
import OrderLookupScreen from './screens/OrderLookupScreen';
import FaqsScreens from './screens/FaqsScreens';
import ShippingInfoScreen from './screens/ShippingInfoScreen';
import ConstactUsScreen from './screens/ConstactUsScreen';
import ReturnsScrenn from './screens/ReturnsScrenn';

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
        <header>
        <Header></Header>
      </header>
      <main> 
        <Route path="/order-lookup" component={OrderLookupScreen}/>
        <Route path="/faqs" component={FaqsScreens}/>
        <Route path="/shipping" component={ShippingInfoScreen}/>
        <Route path="/contact" component={ConstactUsScreen}/>
        <Route path="/returns" component={ReturnsScrenn}/>
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
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
