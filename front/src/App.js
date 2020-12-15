import React from 'react';
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
         <div key={product._id} className="card">
         <a href={`/product/${product._id}`}>
           <img className="medium" src={product.image} alt="product"/>
         </a>
         <div className="card-body">
           <a href={`/product/${product._id}`}>
             <h2>{product.name}</h2>
           </a>
           <div className="note">
             <span> <i className="fa fa-star"></i></span>
             <span> <i className="fa fa-star"></i></span>
             <span> <i className="fa fa-star"></i></span>
             <span> <i className="fa fa-star"></i></span>
             <span> <i className="fa fa-star"></i></span>
           </div> 
       <div className="price">{product.price} €</div>
         </div>
       </div>
       ))}
      </div>
   </main>
   <footer className="row center">
     Copyright © 2020 Montpellier Talent Players - <a href=""> Politique de confidentialité </a>- <a href="">Mentions légales</a>
   </footer>
 </div>
  );
}

export default App;
