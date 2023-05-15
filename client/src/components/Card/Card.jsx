import React from 'react'
import { Link } from 'react-router-dom'
import styles  from './Card.module.css'

const Card = (props) => {

  //traemos los datos necesarios a usar desde props
  const { id, image, name, temperament, weight } = props

  //retornamos los datos de cada card
  return(
    <Link to={`/detail/${id}`} className={styles.cardLink}>
      <div className={styles.cardDog} >
        <img src={image} alt={name} className={styles.imgDog}/>
        <section className={styles.cardInfo}>
          <h2 className={styles.name}>{name}</h2>
          <p>{temperament}</p>
          <p>Peso: {weight} kg</p>
        </section>
      </div>
    </Link>
  )
}

export default Card

