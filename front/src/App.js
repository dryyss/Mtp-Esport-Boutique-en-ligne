import React from 'react';
import Product from './components/Product';
import data from './data';

function App() {
  return (
    
   <div className="grid-container">
     <header className="row">
     <div className="logo">
       <a href="/"><img src="images\téléchargement.png" alt="logo" height="80px"/></a>
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
     <div className="row center">
       {data.products.map((product) => (  
         <Product key={product._id} product={product}></Product>
       ))}
      </div>
   </main>
   <footer className="row center">
     Copyright © 2020 Montpellier Talent Players - <a href="/politique"> Politique de confidentialité </a>- <a href="/mention">Mentions légales</a>
   </footer>
 </div>
  );
}

export default App;
