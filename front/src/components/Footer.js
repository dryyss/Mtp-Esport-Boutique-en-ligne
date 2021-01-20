import React from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY } from '../constants/routes'

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="style-footer">
          <div className="grid">
            <div className="logo">
              <img src="/images/mtp-logo-white.png" alt="logo" height="80px"/>
            </div>
            <div className="footer-main-link"> 
            <div className="footer-header">Boutique</div>
              <div className="footer-boutique">
                <ul>
                  <li><Link to={`/?${CATEGORY}=vetements`}>VETEMENTS</Link></li>
                  <li><Link to={`/?${CATEGORY}=collections`}>COLLECTIONS</Link></li>
                  <li><Link to={`/?${CATEGORY}=chaises`}>CHAISES</Link></li>
                  <li><Link to={`/?${CATEGORY}=gaming`}>GAMING</Link></li>
                </ul>  
              </div>
            </div>
            <div className="footer-main-link">
            <div className="footer-header">Support</div>
              <div className="footer-support"></div>
              
                <ul>
                  <li><Link to="/order-lookup">ETAT DE LA  COMMANDE</Link></li>
                  <li><Link to="/faqs">FAQS</Link></li>
                  <li><Link to="/shipping">INFO DE LIVRAISON</Link></li>
                  <li><Link to="/contact">NOUS CONTACTER</Link></li>
                  <li><Link to="/returns">POLITIQUE DE RETOUR</Link></li> 
                </ul>  
            </div>
          </div>
        </div>
        <div className="row center bot-policy">
          <i>Copyright © 2020 Montpellier Talent Players </i> 
          <Link to="/politique"> &nbsp;POLITIQUE DE CONFIDENTIALITÉ  </Link>
          <Link to="/legal-info"> &nbsp;POLITIQUE SUR LES COOKIES </Link>
          <Link to="/politique"> &nbsp;CONDITIONS D'UTILISATION </Link> 
          <Link to="/mention"> &nbsp;MENTIONS LÉGALES</Link>
        </div>
      </div>
    </footer>
  )
}
