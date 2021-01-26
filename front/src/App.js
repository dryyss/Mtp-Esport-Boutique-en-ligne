import React, { useEffect, useRef, useState } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import ShippingMethodScreen from "./screens/ShippingMethodScreen";
import OrderConfirmationScreen from "./screens/OrderConfirmationScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductAdminListScreen from "./screens/ProductAdminListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderAdminListScreen from "./screens/OrderAdminListScreen";
import UserAdminListScreen from "./screens/UserAdminListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SearchScreen from "./screens/SearchScreen";
import { SEARCH_QUERY } from "./constants/routes";
import { gsap } from "gsap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderLookupScreen from "./screens/OrderLookupScreen";
import FaqsScreens from "./screens/FaqsScreens";
import ShippingInfoScreen from "./screens/ShippingInfoScreen";
import ConstactUsScreen from "./screens/ConstactUsScreen";
import ReturnsScrenn from "./screens/ReturnsScrenn";
import MapsScreen from "./screens/MapsScreen";

function App() {
  const refMenu = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [windowWidthSize, setWindowWidthSize] = useState(911);

  const handleResize = (event) => {
    setWindowWidthSize(event.target.innerWidth);
  };
  const handleLoad = (event) => {
    setWindowWidthSize(event.currentTarget.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleLoad);
  });

  useEffect(() => {
    if (refMenu.current) {
      if (windowWidthSize <= 910 && !menuIsOpen) {
        console.log("=>", windowWidthSize);
        refMenu.current.style = "transform: translate(0px, -200%)";
      } else {
        refMenu.current.style = "transform: translate(0px, 0)";
      }
    }
  }, [refMenu, windowWidthSize, menuIsOpen]);

  useEffect(() => {
    if (refMenu.current <= 910) {
      if (menuIsOpen) {
        gsap.fromTo(
          [refMenu.current],
          {
            opacity: 0,
            y: "-200%",
            duration: 0.5,
          },
          {
            opacity: 1,
            y: "0%",
            duration: 0.5,
          }
        );
      } else {
        gsap.fromTo(
          [refMenu.current],
          {
            opacity: 1,
            y: "0%",
            duration: 0.5,
          },
          {
            opacity: 0,
            y: "-200%",
            duration: 0.5,
          }
        );
      }
    }
  }, [menuIsOpen]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <div className="burger">
          <i
            className={`fa fa-${menuIsOpen ? "times" : "bars"}`}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          />
        </div>
        <Header ref={refMenu} />
        <main>
          <Route path="/order-lookup" component={OrderLookupScreen} />
          <Route path="/faqs" component={FaqsScreens} />
          <Route path="/shipping" component={ShippingInfoScreen} />
          <Route path="/contact" component={ConstactUsScreen} />
          <Route path="/returns" component={ReturnsScrenn} />
          <Route
            path={`${SEARCH_QUERY}=:name`}
            component={SearchScreen}
            exact
          />
          <Route path="/placeOrder/:id" component={PlaceOrderScreen} />
          <Route path="/orderHistory" component={OrderHistoryScreen} />
          <Route
            path="/orderConfirmation/:id/paid"
            component={OrderConfirmationScreen}
          />
          <Route path="/payment_methods/:id" component={PaymentMethodsScreen} />
          <Route path="/shipping_methods" component={ShippingMethodScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact />
          <Route path="/" component={HomeScreen} exact />
          <PrivateRoute path="/map" component={MapsScreen}></PrivateRoute>
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
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
