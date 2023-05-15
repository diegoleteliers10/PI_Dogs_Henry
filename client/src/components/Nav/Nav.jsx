import style from './Nav.module.css'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'


const Nav = (props) => {
  return (
    <nav className={style.navBar}>

      <button className={style.logoButton} onClick={() => window.location.reload()}>
        <Link  to='/home'><img src='logo-no-background.png' alt="logo" className={style.logo}/></Link>
      </button>
      <div  className={style.buttonsCont}>

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