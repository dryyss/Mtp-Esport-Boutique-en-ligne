import React from 'react'

export default function InscriptionSteps(props) {
    return (
     
        <div className="row checkout-steps">
            <div className={props.inscription_step ? 'active' : ''}>Inscription</div>
            <div className={props.connexion_step ? 'active' : ''}>Connexion</div>
        </div>
    )
}
