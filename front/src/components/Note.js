import React from 'react'

export default function Note(props) {
    const {note, numReviews} = props;
    return (
    <div className="note">
        <span><i className={note>=1?'fas fa-star': note>=0.5?'fas fa-star-half-alt':"far fa-star"}></i></span>
        <span><i className={note>=2?'fas fa-star': note>=1.5?'fas fa-star-half-alt':"far fa-star"}></i></span>
        <span><i className={note>=3?'fas fa-star': note>=2.5?'fas fa-star-half-alt':"far fa-star"}></i></span>
        <span><i className={note>=4?'fas fa-star': note>=3.5?'fas fa-star-half-alt':"far fa-star"}></i></span>
        <span><i className={note>=5?'fas fa-star': note>=4.5?'fas fa-star-half-alt':"far fa-star"}></i></span>
        <span>{numReviews +' Avis'}</span>
    </div> 
    )
}
