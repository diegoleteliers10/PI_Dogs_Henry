import React from 'react'
import styles from './Search.module.css'
import { useDispatch } from 'react-redux'
import { getDogBreed, showAllDogs } from '../../redux/actions'

const SearchBar = () => {

  //usamos el useState para crear nuestro estado de breed y creamos el dispatch
  const [breed,setBreed]=React.useState('')
  const dispatch=useDispatch()

  //creamos una funcion para manejar el evento de busqueda y setear nuestro dog al breed
     const handleSearch= (event)=>{
      event.preventDefault()
      let dog=event.target.value
      setBreed(dog)
    }

    //creamos una funcion para manejar el evento de envio y mandar a llamar la accion de busqueda
    const handleSubmit = (event) => {
      event.preventDefault()
      dispatch(getDogBreed(breed));
    }

    //creamos una funcion para manejar el evento de cancelar y mandar a llamar la accion de mostrar todos los dogs
    const handleCancel=()=>{
            dispatch(showAllDogs());
    }
  return (
    <>
      <form className={styles.form}>
          <button className={styles.button} type='submit' onClick={handleSubmit} >
              <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                  <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
          </button>
          <input className={styles.input} placeholder="Type your text" type="text" onChange={handleSearch} />
          <button className={styles.reset} type="reset" onClick={() => setTimeout(() => handleCancel(), 0)}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.svgI} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
          </button>
      </form>
  </>
  )
}

export default SearchBar