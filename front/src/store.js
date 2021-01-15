import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderDeleteReducer, orderListReducer, orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer, orderDeliverReducer } from "./reducers/orderReducers";
import { productDeleteReducer, productCreateReducer, productDetailsReducer, productListReducer,productUpdateReducer} from './reducers/productReducers';
import { userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer } from "./reducers/userReducers";

const initialState = {
    userSignin:{
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal',
      },

};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userList: userListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer, 
    orderList: orderListReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
     initialState, 
     composeEnhancer(applyMiddleware(thunk))
);

export default store; 