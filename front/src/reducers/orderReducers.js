import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
  } from '../constants/orderConstants';
  
  export const orderCreateReducer = (state = {order:{}, loading: false}, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return {...state, loading: true };
      case ORDER_CREATE_SUCCESS:
        return {...state, loading: false, success: true, order: action.payload };
      case ORDER_CREATE_FAIL:
        return {...state, loading: false, error: action.payload };
      case ORDER_CREATE_RESET:
      default:
        return state;
    }
  };
  
  export const orderDetailsReducer = (state = {order:{}, loading: false}, action) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return {...state, loading: true };
      case ORDER_DETAILS_SUCCESS:
        return {...state, loading: false, order: action.payload };
      case ORDER_DETAILS_FAIL:
        return {...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_PAY_REQUEST:
        return { ...state, loading: true };
      case ORDER_PAY_SUCCESS:
        return {...state, loading: false, success: true };
      case ORDER_PAY_FAIL:
        return {...state, loading: false, error: action.payload };
      case ORDER_PAY_RESET:
      default:
        return state;
    }
  };
  export const orderMineListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_MINE_LIST_REQUEST:
        return {...state, loading: true };
      case ORDER_MINE_LIST_SUCCESS:
        const orders = action.payload.filter(o =>  o.isPaid)
        return {...state, loading: false, orders };
      case ORDER_MINE_LIST_FAIL:
        return {...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return {...state, loading: true };
      case ORDER_LIST_SUCCESS:
        const orders = action.payload.filter(o =>  o.isPaid)
        return {...state, loading: false, orders }; 
      case ORDER_LIST_FAIL:
        return {...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };