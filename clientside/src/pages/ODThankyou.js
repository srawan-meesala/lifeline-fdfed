import React from 'react'
import '../styles/ODThankyou.css'
import { useNavigate, useParams } from 'react-router-dom'

function ODThankyou() {
  
  const navigate = useNavigate()
  const {username} = useParams()
  const ButtonHandler = () => navigate(`/home/${username}`)

  return (  
    <div><div class="ODThankyou-containerr">
    <div class="ODThankyou-logo">Lifeline.</div>
    <div class="ODThankyou-content">
        <div class="ODThankyou-l1">Your Donation has been approved and the Donation form is confirmed.</div>
        <div class="ODThankyou-l2">Thankyou for Donating, Your Donation will save a Life</div>
        <div class="ODThankyou-l3">Thank you for choosing Lifeline as your medical partner.</div>
    </div>
    <div class="ODThankyou-btn-home">
        <button onClick={ButtonHandler}>Back to Home</button>
    </div>
</div>
<div class="ODThankyou-background">
    <svg class="ODThankyou-border shadow-md" viewBox="0 0 1081.52 608.355"  xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect class="bg" id="bg" x="0" y="0" width="1081.52" height="608.355" fill="#ffffff"></rect><g transform="rotate(0 540.76 304.1775)"><path d="M -540.76 498.36 S -280.38 446.36
        0.00 498.36 83.76 438.36
        540.76 498.36 801.14 497.36
        1081.52 498.36 1178.28 446.36
        1622.28 498.36 h 110 V 1208.355 H -540.76 Z" fill="#023040"></path><path d="M -540.76 135.00 S -448.00 56.00
        0.00 135.00 260.38 77.50
        540.76 135.00 533.52 59.00
        1081.52 135.00 1341.90 77.50
        1622.28 135.00 h 110 V -600 H -540.76 Z" fill="#023040"></path></g></svg>
</div></div>
  )
}

export default ODThankyou