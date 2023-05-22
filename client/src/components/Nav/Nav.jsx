import style from './Nav.module.css'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import { useRef } from 'react'
import { useEffect } from 'react'


const Nav = (props) => {

    // Creamos una referencia que parta en null y la asignamos al botón activo
  const home = useRef(null);
  // Función para manejar el clic en el botón de página, que a medida que cambia la pagAct se actualiza el valor de activeButtonRef
  useEffect(() => {
      home.current.focus();
  }, []);
  return (
    <nav className={style.navBar}>

      <button className={style.logoButton} onClick={() => window.location.reload()}>
      <img src='/logo-no-background.png' alt="logo" className={style.logo}/>
      </button>
      <div  className={style.buttonsCont}>

        <Link  to='/home' className={style.homeLink} tabIndex={0} ref={home}>Home</Link>

        <button className={style.button}>
          <span className={style.button__text}>Add a Dog</span>
          <Link to='/formDog'><span className={style.button__icon}><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className={style.svg}><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span></Link> 
        </button>

      </div>
      <div>
        <SearchBar />
      </div>
    </nav>
  )
}

export default Nav