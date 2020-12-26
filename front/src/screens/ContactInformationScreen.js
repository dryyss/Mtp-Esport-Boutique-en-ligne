
import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'
import TotalPrice from '../components/TotalPrice';

export default function ContactInformationScreen(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems, shippingAddress} = cart;
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin; 
    if(!userInfo){
        props.history.push('/signin')
    }
    const [email, setEmail] = useState(shippingAddress.email);
    const [firstName, setFirstName] = useState(shippingAddress.firstName);
    const [lastName, setLastName] = useState(shippingAddress.lastName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [address2, setAddress2] = useState(shippingAddress.address2);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [city, setCity] = useState(shippingAddress.city);
    const [country, setCountry] = useState(shippingAddress.country);
    const [telephone, setTelephone] = useState(shippingAddress.telephone);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({
            email,
            firstName,
            lastName,
            address,
            postalCode,
            city,
            country,
        })   )
           props.history.push('shipping_methods');
        
    };
  
    const dispatch = useDispatch();
  
    return (
        <div>
            <CheckoutSteps contact_information></CheckoutSteps>
            <div>
                <form className="form" onSubmit={submitHandler}>
                    
                    <div className="contact-info">
                         <h2>Information de contact</h2>                  
                            <div className="logged-in-customer-information__paragraph">
                               
                                <div className="section_content">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        type="text"
                                        id="email"
                                        placeholder= {userInfo.email}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required  />
                                </div>
                            </div>
                        
                            <div className=" section section--shipping-address">
                                <div className="section_header">
                                    <h2 className="section_title">Adresse de livraison</h2>
                                </div>
                                <div className="section_content form-fullName">
                                    <label htmlFor="firstName">Prénom</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder="Prénom"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)} 
                                        required  />
                                    
                                </div>
                                <div className="section_content form-fullName">
                                <label htmlFor="lastName">Nom</label>
                                        <input  
                                            type="text"
                                            id="lastName"
                                            placeholder="Nom"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)} 
                                            required  />
                                </div>
                                <div className="section_content">
                                    <label htmlFor="address">Adresse</label>
                                    <input className="field_input"
                                        type="text"
                                        id="address"
                                        placeholder="Adresse"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)} 
                                        required  />
                                </div>
                                <div className="section_content">
                                    <label htmlFor="address2"></label>
                                    <input className="field_input"
                                        type="text"
                                        id="address2"
                                        placeholder="Appartement, chambre, etc. (facultatif)"   
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)} 
                                    />
                                </div>
                                <div className="section_content">
                                    <label htmlFor="postalCode">Code postal</label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        placeholder="Code postal"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)} 
                                        required  />
                                </div>
                                <div className="section_content">
                                    <label htmlFor="city">Ville</label>
                                    <input 
                                        type="text"
                                        id="city"
                                        placeholder="Ville"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)} 
                                        required  />
                                </div>
                                <div className="section_content">
                                    <label htmlFor="country">Pays/Région</label>
                                        <select size="1"  aria-required="true" name="checkout[address][country]" id="country"
                                        placeholder="Pays/Région"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)} 
                                        required >
                                            <option data-code="DE" value="Germany">Allemagne</option>
                                            <option data-code="FR" value="France">France</option>
                                            <option data-code="GB" value="United Kingdom">Royaume-Uni</option>
                                            <option data-code="ES" value="Spain">Espagne</option>
                                            <option data-code="DE" value="Germany">Allemagne</option>
                                            <option data-code="AT" value="Austria">Autriche</option>
                                            <option data-code="BE" value="Belgium">Belgique</option>
                                            <option data-code="DK" value="Denmark">Danemark</option>
                                            <option data-code="ES" value="Spain">Espagne</option>
                                            <option data-code="FI" value="Finland">Finlande</option>
                                            <option data-code="FR" value="France">France</option>
                                            <option data-code="GR" value="Greece">Grèce</option>
                                            <option data-code="HU" value="Hungary">Hongrie</option>
                                            <option data-code="IE" value="Ireland">Irlande</option>
                                            <option data-code="IT" value="Italy">Italie</option>
                                            <option data-code="LU" value="Luxembourg">Luxembourg</option>
                                            <option data-code="NO" value="Norway">Norvège</option>
                                            <option data-code="NL" value="Netherlands">Pays-Bas</option>
                                            <option data-code="PL" value="Poland">Pologne</option>
                                            <option data-code="PT" value="Portugal">Portugal</option>
                                            <option data-code="RO" value="Romania">Roumanie</option>
                                            <option data-code="SE" value="Sweden">Suède</option>
                                            <option data-code="CH" value="Switzerland">Suisse</option>
                                            <option data-code="CZ" value="Czech Republic">Tchéquie</option>
                                            <option data-code="TR" value="Turkey">Turquie</option>
                                        </select>
                                </div>
                                <div className="section_content">
                                    <label htmlFor="telephone">Téléphone</label>
                                    <input className="field_input"
                                        type="text"
                                        id="telephone"
                                        placeholder="Téléphone"
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)} 
                                        />
                                </div>   
                             </div> 
                        <div className="step_footer">
                            <button className="button  payment-button" type="submit">
                                        Passer à la méthode de livraison
                            </button>
                        </div>
                    </div>
                </form>
                <div className="sidebar">
                    <ul>
                    {cartItems.map((item) => (
                        <li key={item.product}>
                            <div className="row">
                                <div>
                                <img 
                                    src={item.image}
                                    alt={item.name} 
                                    className="small"/>
                                </div>
                                <div className="min-30">
                                    {item.name}
                                </div>
                                <div>
                                    <span>Quantité: {item.qty}</span> 
                                </div>
                                <div>
                                    {item.price.toFixed(2)} €
                                </div>
                             </div>
                         </li>
                    ))}
                       <TotalPrice></TotalPrice>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}
