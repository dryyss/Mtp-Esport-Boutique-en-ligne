import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import { signout } from '../actions/userActions';
import { CATEGORY } from '../constants/routes';
import SearchBox from './SearchBox';

const Header = forwardRef(
  (props, ref) => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin; 
    const dispatch = useDispatch();
    const signoutHandler =() =>{
      dispatch(signout());    
    }
    
    return (
      <header className="row">
        <div className="logo">
          <Link to="/"><img src="/images/mtp-logo-white.png" alt="logo" height="80px"/></Link>
        </div>
        <div className="row menu" ref={ref}>
          <div className="nav-center">
            <ul>
              <div className="dropdown user-dropdown">
                <div className="dropdown">  
                  <Link to={`/?${CATEGORY}=vetements`}>Vetements<i className="fas fa-caret-down"/></Link>   
                  <ul className="dropdown-content">
                    <li className="see_all">
                      <Link to={`/?${CATEGORY}=vetements`}>Tout voir</Link>
                    </li>
                    <li>
                      <Link to="/tops">Hauts</Link>
                    </li>
                    <li>
                      <Link to="/bottoms">Bas</Link>
                    </li>
                    <li>
                      <Link to="/hoodies-jacket">Sweat et vestes</Link>
                    </li>
                    <li>
                      <Link to="/sportswear">Survetements</Link>
                    </li>
                    <li>
                      <Link to="/accesories">Accesoires</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="dropdown user-dropdown">
                <div className="dropdown-item">
                  <Link to={`/?${CATEGORY}=collections`}>Collections<i className="fas fa-caret-down"/></Link>
                  <ul className="dropdown-content">
                  <li className="see_all">
                      <Link to={`/?${CATEGORY}=collections`}>Tout voir</Link>
                    </li>
                    <li>
                      <Link to="/figures">Figurines</Link>
                    </li>
                    <li>
                      <Link to="/statues">Statues</Link>
                    </li>
                    <li>
                      <Link to="/plush">Peluches</Link>
                    </li>
                    <li>
                      <Link to="/accesories">Accesoires</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="dropdown user-dropdown">
                <div className="dropdown-item">
                  <Link to={`/?${CATEGORY}=chaises`}>Chaises<i className="fas fa-caret-down"/></Link>
                </div>
                
              </div>
              <div className="dropdown user-dropdown">
                <div className="dropdown-item">
                  <Link to={`/?${CATEGORY}=gaming`}>Gaming<i className="fas fa-caret-down"/></Link>
                  <ul className="dropdown-content">
                    <li className="see_all">
                      <Link to={`/?${CATEGORY}=gaming`}>Tout voir</Link>
                    </li>
                    <li>
                      <Link to={`/?${CATEGORY}=chaises`}>Chaises</Link>
                    </li>
                    <li>
                      <Link to="/laptops">Tapis</Link>
                    </li>
                    <li>
                      <Link to="/mouses">Souris</Link>
                    </li>
                    <li>
                      <Link to="/keyboards">Claviers</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </ul>
          </div>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <div className="nav-right">
            <Link to="/cart"><i className="fas fa-shopping-cart">{cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}</i> 
            </Link>
          
            {userInfo ? (
              <div className="dropdown user-dropdown">
                <div className="dropdown-item">
                  <div className="nav-user-type">
                    <Link to="#">{userInfo.firstName}  <i className="fas fa-caret-down"/></Link> 
                  </div> 
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/orderHistory">Historique des achats</Link>
                    </li>
                    <li>
                      <Link to="/profile">Mon Compte</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>Deconnexion</Link>
                    </li> 
                  </ul>
                </div>
              </div>
              ) : (
                <div className="nav-right">
                  <Link to ="/register">Inscription</Link>
                    <Link to ="/signin">Connexion</Link>
                </div>
              )}
              {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin <i className="fa fa-caret-down"/>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                  </ul>
                </div>
              )}
          </div>
        </div>
      </header>
    )
  }
);

export default Header;
