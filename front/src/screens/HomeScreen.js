import React, {  useEffect, useState } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import {listProducts} from '../actions/productActions';
import { useLocation } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch()
  const location = useLocation()

  const productList = useSelector(state => state.productList);
  const {loading, error, products = []} = productList;
  const [productListFiltered, setProductListFiltered] = useState([]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    const queryURI = new URLSearchParams(location.search).get('query');
    const productFiltered = queryURI
      ? products.map((product) => product.category === queryURI && <Product key={product._id} product={product} />).filter(o => o)
      : products.map((product) => <Product key={product._id} product={product} />);
    setProductListFiltered(productFiltered);
  }, [location.search, products]);
  
  return (
    <div>
      {loading? (
        <LoadingBox/> 
      ) : error ? ( 
        <MessageBox variant="danger">{error}</MessageBox>
      ):(
        <div className="row center">
          {productListFiltered}
        </div>
      )}
    </div>
  )
}
