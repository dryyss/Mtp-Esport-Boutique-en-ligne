import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import  {Route, BrowserRouter, Link } from 'react-router-dom'

function App() {
  return (
  <BrowserRouter>
    <div className="grid-container">
        <header className="row">
        <div className="logo">
          <Link to="/"><img src="../public/images/téléchargement.png" alt="logo" height="80px"/></Link>
        </div>

        <div className="nav-center">
          <ul>
            
            <a href="/vetements">Vetements</a>
            <a href="/collections">Collections</a>
            <a href="/chaises">Chaises</a>
            <a href="/gaming">Gaming</a>
          </ul>
        </div>
        <div className="nav-right">
          <a href="/cart">Panier</a>
          <a href="/signin">Connexion</a>
        </div>
      </header>
        
      <main> 
        
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
