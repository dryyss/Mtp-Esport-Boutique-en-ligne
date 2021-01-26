import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import TotalPrice from "../components/TotalPrice";
import {
  ORDER_CREATE_REQUEST,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export default function ShippingMethodScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order } = orderCreate;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.shippingPrice = cart.itemsPrice > 150 ? toPrice(0) : toPrice(10);
  const [email, setEmail] = useState(shippingAddress.email || userInfo.email);
  const [firstName, setFirstName] = useState(
    shippingAddress.firstName || userInfo.firstName
  );
  const [lastName, setLastName] = useState(
    shippingAddress.lastName || userInfo.lastName
  );
  const [address, setAddress] = useState(shippingAddress.address);
  const [address2, setAddress2] = useState(shippingAddress.address2);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [telephone, setTelephone] = useState(shippingAddress.telephone);
  const dispatch = useDispatch();
  const chooseOnMap = () => {
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm("Vous ne trouvez pas votre adresse. Continuez?");
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          firstName,
          lastName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/map");
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        email,
        firstName,
        lastName,
        address,
        postalCode,
        city,
        country,
        lat,
        lng,
      })
    );
    dispatch(
      createOrder({
        ...cart,
        orderItems: cart.cartItems,
      })
    );
    dispatch({ type: ORDER_CREATE_REQUEST });
    dispatch({ type: ORDER_PAY_RESET });
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/payment_methods/${order._id}`);
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps shipping_method></CheckoutSteps>
      <div className="d_flex gap-20">
        <form className="form" onSubmit={submitHandler}>
          <div className="contact-info">
            <div className="section_header">
              <h2 className="section_title">Information de contact </h2>
            </div>
            <div className="logged-in-customer-information__paragraph">
              <div className="section_content">
                <label htmlFor="email">E-mail *</label>
                <input
                  className="field_input"
                  type="text"
                  id="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className=" section section--shipping-address">
              <div className="section_header">
                <h2 className="section_title">Adresse de livraison </h2>
              </div>
              <div className="section_content_fullName">
                <div className="section_content form-fullName">
                  <label htmlFor="lastName">Nom *</label>
                  <input
                    className="field_input_fullname"
                    type="text"
                    id="lastName"
                    placeholder="{userInfo.lastName}"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>{" "}
                <div className="section_content form-fullName">
                  <label htmlFor="firstName">Prénom *</label>
                  <input
                    className="field_input_fullname"
                    type="text"
                    id="firstName"
                    placeholder="prenom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="section_content">
                <label htmlFor="address">Adresse *</label>
                <input
                  className="field_input"
                  type="text"
                  id="address"
                  placeholder="Adresse"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="section_content">
                <label htmlFor="address2"></label>
                <input
                  className="field_input"
                  type="text"
                  id="address2"
                  placeholder="Appartement, chambre, etc. (facultatif)"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
              <div className="section_fullAddress">
                <div className="section_content">
                  <label htmlFor="postalCode">Code postal *</label>
                  <input
                    type="text"
                    id="postalCode"
                    placeholder="Code postal"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>
                <div className="section_content">
                  <label htmlFor="city">Ville *</label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Ville"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="section_content">
                  <label htmlFor="country">Pays/Région *</label>
                  <select
                    className="select-country"
                    size="1"
                    aria-required="true"
                    name="checkout[address][country]"
                    id="country"
                    placeholder="Pays/Région"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    <option value="Option">Pays/Région</option>
                    <option data-code="FR" value="France">
                      France
                    </option>
                    <option data-code="GB" value="United Kingdom">
                      United Kingdom
                    </option>
                    <option data-code="DE" value="Germany">
                      Germany
                    </option>
                    <option data-code="AT" value="Austria">
                      Austria
                    </option>
                    <option data-code="BE" value="Belgium">
                      Belgium
                    </option>
                    <option data-code="DK" value="Denmark">
                      Denmark
                    </option>
                    <option data-code="ES" value="Spain">
                      Spain
                    </option>
                    <option data-code="FI" value="Finland">
                      Finland
                    </option>
                    <option data-code="GR" value="Greece">
                      Greece
                    </option>
                    <option data-code="HU" value="Hungary">
                      Hungary
                    </option>
                    <option data-code="IE" value="Ireland">
                      Ireland
                    </option>
                    <option data-code="IT" value="Italy">
                      Italy
                    </option>
                    <option data-code="LU" value="Luxembourg">
                      Luxembourg
                    </option>
                    <option data-code="NO" value="Norway">
                      Norway
                    </option>
                    <option data-code="NL" value="Netherlands">
                      Netherlands
                    </option>
                    <option data-code="PL" value="Poland">
                      Poland
                    </option>
                    <option data-code="PT" value="Portugal">
                      Portugal
                    </option>
                    <option data-code="RO" value="Romania">
                      Romania
                    </option>
                    <option data-code="SE" value="Sweden">
                      Sweden
                    </option>
                    <option data-code="CH" value="Switzerland">
                      Switzerland
                    </option>
                    <option data-code="CZ" value="Czech Republic">
                      Czech Republic
                    </option>
                    <option data-code="TR" value="Turkey">
                      Turkey
                    </option>
                  </select>
                </div>
              </div>
              <div className="section_content">
                <label htmlFor="telephone">Téléphone </label>
                <input
                  className="field_input"
                  type="text"
                  id="telephone"
                  placeholder="Téléphone (facultatif)"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
            </div>
            <div className="shipping-methods">
              <div className="section_header">
                <h2>Méthode de livraison</h2>
              </div>
              <div className="content-box">
                <div className="section_content">
                  <div className="radio_input">
                    <span> Frais de port fixes</span>
                    <th>
                      Livraison: {cart.shippingPrice.toFixed(2)} €
                      <input type="radio" defaultChecked required />
                    </th>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="chooseOnMap">Location</label>
              <button type="button" onClick={chooseOnMap}>
                Choisir sur la carte
              </button>
            </div>
            <div className="step_footer">
              <button className="button payment-button" type="submit">
                Livraison
              </button>
              {/* { loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>} */}
            </div>
          </div>
        </form>
        <div className="sidebar">
          <ul>
            <div className="product-summary">
              {cart.cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row summary">
                    <div>
                      <img src={item.image} alt={item.name} className="small" />
                    </div>
                    <span className="product-thumbnail__quantity">
                      {" "}
                      {item.qty}
                    </span>
                    <div className="min-30">{item.name}</div>
                    <div>{item.price.toFixed(2)} €</div>
                  </div>
                </li>
              ))}
            </div>
            <TotalPrice></TotalPrice>
          </ul>
        </div>
      </div>
    </div>
  );
}
