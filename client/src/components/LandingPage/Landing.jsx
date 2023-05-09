import React from 'react'
import { Link } from 'react-router-dom'

const Landing = (props) => {
  console.log(props)
  return (
    <div>
      <h1>AdoptDog</h1>
      <h2>Find your new best friend!</h2>
      <p>If you are looking for a new best friend, you are in the right place. Here you can give up for addoption or adopt a new friend for your life.</p>
      <Link to="/home">
          <button onClick={props.goHome}>Adopt or Give up for adoption</button>
      </Link>
    </div>
  )
}

export default Landing