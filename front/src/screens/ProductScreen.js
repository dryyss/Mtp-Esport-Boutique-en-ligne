import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "../components/Note";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import { createReview, detailsProduct } from "../actions/productActions";
import MessageBox from "../components/MessageBox";
import { gsap } from "gsap";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

export default function ProductScreen(props) {
  const refs0 = useRef([]);
  const refs1 = useRef([]);
  const refs2 = useRef([]);
  const refs3 = useRef([]);
  const refs4 = useRef([]);
  const refs5 = useRef([]);

  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;
  const [note, setNote] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (refs0.current) {
      gsap.fromTo(
        [refs0.current],
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
        }
      );

      gsap.fromTo(
        [
          refs1.current,
          refs2.current,
          refs3.current,
          refs4.current,
          refs5.current,
        ],
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.0,
          stagger: 0.1,
        }
      );
    }
  });

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setNote("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && note) {
      dispatch(
        createReview(productId, {
          note,
          comment,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
        })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Link to="/">Retour à la page d'accueil</Link>
          <div className="row">
            <div className="col-2">
              <div>
                <img
                  ref={refs0}
                  className="large"
                  src={product.image}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="col-1">
              <div className="black-blocs">
                <div className="shape-top" />
                <div>
                  <h1 ref={refs1}>{product.name}</h1>
                  <div ref={refs2} className="price">
                    {product.price.toFixed(2)} €
                  </div>
                  <div ref={refs3} className="description">
                    <div>{product.description}</div>
                  </div>
                  <div ref={refs4}>
                    <Note note={product.note} numReviews={product.numReviews} />
                  </div>
                  <div ref={refs5} className="actions-item">
                    {product.countInStock > 0 ? (
                      <div className="row">
                        <div>Quantité</div>
                        <div>
                          <select
                            className="select select-cart "
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <button
                            className="button  payment-button"
                            onClick={addToCartHandler}
                          >
                            <span>Ajouter au Panier</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="danger">Rupture de Stock</span>
                    )}
                  </div>
                </div>
                <div className="shape-bottom" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
