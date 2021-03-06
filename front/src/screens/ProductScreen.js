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
          <div className="col-2">
            <h2 id="reviews">Avis</h2>
            {product.reviews.length === 0 && (
              <MessageBox>Aucun avis n'as encore été posté.</MessageBox>
            )}
            <ul>
              {product.reviews &&
                product.reviews.map((review) => (
                  <li key={review._id}>
                    <strong>
                      {review.firstName} {review.lastName}
                    </strong>
                    <Note note={review.note} caption=" " />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              <li>
                {userInfo ? (
                  <form className=" col-1 form" onSubmit={submitHandler}>
                    <div>
                      <h2>Ecrivez votre avis sur le Produit</h2>
                    </div>
                    <div>
                      <label htmlFor="note">Note</label>
                      <select
                        name="note"
                        id={note}
                        on
                        onChange={(e) => setNote(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Très Mauvais</option>
                        <option value="2">2- Mauvais</option>
                        <option value="3">3- Bon</option>
                        <option value="4">4- Très Bon</option>
                        <option value="5">5- Excellent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Commentaires</label>
                      <textarea
                        name="comment"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="button" type="submit">
                        Envoyez
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Pour donnez votre avis
                    <Link to="/signin">Connectez vous</Link>
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
