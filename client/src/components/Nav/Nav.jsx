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
          <Link  to='/about'>About</Link>
        </button>

        <button className={style.button}>
          <Link  to='/favorite'>Favorites</Link>
        </button>
        
      </div>
      <div>
        <SearchBar />
      </div>
    </nav>
  )
}

export default Nav