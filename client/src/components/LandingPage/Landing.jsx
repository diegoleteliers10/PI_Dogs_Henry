import React from 'react'
import { Link } from 'react-router-dom'
import style from './Landing.module.css'

const Landing = (props) => {
  console.log(props)
  return (
    <div className={style.landingContainer}>
      <img src="logo-no-background_black.png" alt="logo" className={style.logoLanging}/>
      <div className={style.textContainer}>
        <h1 className={style.title}>Welcome to</h1>
        <h1 className={style.titleLanding}>DoggyDeep</h1>
        <h2 className={style.subtiLanding}>In DoggyDeep you can find all about your best friend!</h2>
      </div>
      <div className={style.textContainer1} >
        <p className={style.pLanding}>You are in the right place if you are looking for a new best friend and you want to know everything about him. Here you can learn all about your new canine friend.</p>
      </div>
        <Link to="/home">
            <button onClick={props.goHome} className={style.landingBbutton}>Look over a dog</button>
        </Link>
      
    </div>
  )
}

export default Landing