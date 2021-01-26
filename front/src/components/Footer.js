import React from "react";
import { Link } from "react-router-dom";
import { CATEGORY } from "../constants/routes";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="style-footer">
          <div className="grid">
            <div className="logo">
              <img
                src="/images/mtp-logo-white.png"
                alt="logo"
                width="100px"
                height="1000px"
              />
            </div>
            <div className="footer-main-link">
              <div className="footer-header">Boutique</div>
              <div className="footer-boutique">
                <ul>
                  <li>
                    <Link to={`/?${CATEGORY}=vetements`}>
                      <strong>VETEMENTS</strong>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/?${CATEGORY}=collections`}>
                      <strong>COLLECTIONS</strong>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/?${CATEGORY}=chaises`}>
                      <strong>CHAISES</strong>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/?${CATEGORY}=gaming`}>
                      <strong>GAMING</strong>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-main-link">
              <div className="footer-header">Support</div>
              <div className="footer-support"></div>

              <ul>
                <li>
                  <Link to="/order-lookup">
                    <strong>ETAT DE LA COMMANDE</strong>
                  </Link>
                </li>
                <li>
                  <Link to="/faqs">
                    <strong>FAQS</strong>
                  </Link>
                </li>
                <li>
                  <Link to="/shipping">
                    <strong>INFO DE LIVRAISON</strong>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <strong>NOUS CONTACTER</strong>
                  </Link>
                </li>
                <li>
                  <Link to="/returns">
                    <strong>POLITIQUE DE RETOUR</strong>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row center bot-policy">
          <i>Copyright © 2020 Montpellier Talent Players </i>
          <Link to="/politique"> &nbsp;POLITIQUE DE CONFIDENTIALITÉ </Link>
          <Link to="/legal-info"> &nbsp;POLITIQUE SUR LES COOKIES </Link>
          <Link to="/politique"> &nbsp;CONDITIONS D'UTILISATION </Link>
          <Link to="/mention"> &nbsp;MENTIONS LÉGALES</Link>
        </div>
      </div>
    </footer>
  );
}
