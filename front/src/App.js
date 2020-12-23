import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import  {Route, BrowserRouter, Link } from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import { useSelector } from 'react-redux';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
  <BrowserRouter>
    <div className="grid-container">
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
          <Link to="/cart"><i class="fas fa-shopping-cart">{cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}</i> 
          </Link>
          <Link to="/signin">Connexion</Link>
        </div>
      </header>
        
      <main> 
        <Route path="/cart/:id?"component={CartScreen}/>
        <Route path="/product/:id" component={ProductScreen}/>
        <Route path="/" component={HomeScreen} exact/>
        
      </main>
      <footer className="row center">
       Copyright © 2020 Montpellier Talent Players - <a href="/politique"> Politique de confidentialité </a>- <a href="/mention">Mentions légales</a>
      </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
