import React from 'react'
import { Link } from 'react-router-dom'
import styles  from './Card.module.css'
import { useDispatch } from 'react-redux';
import { deleteDog } from '../../redux/actions';

const Card = (props) => {

  //traemos los datos necesarios a usar desde props
  const { id, image, name, temperament, weight } = props
  const dispatch = useDispatch();

  const handleDelete = (event) => {
    dispatch(deleteDog(id));
  };

  //retornamos los datos de cada card
  return(
        <div className={styles.cardDog} >
          <img src={image} alt={name} className={styles.imgDog}/>
          <section className={styles.cardInfo}>
            <Link to={`/detail/${id}`} className={styles.cardLink}><h2 className={styles.name}>{name}</h2></Link>
            <p>{temperament}</p>
            <p>Peso: {weight} kg</p>
          </section>
        {typeof id !== 'number' && (
          <button className={styles.deleteBtn} onClick={handleDelete}>X</button>
        )}
        </div>
  )
}

export default Card

