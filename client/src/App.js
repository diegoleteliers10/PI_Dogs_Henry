import { Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/LandingPage/Landing';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import { useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';


function App() {
  //lo usamos para ingresar al inicio de la pagina y lo seteamos en false hasta que demos en el boton de landing
  let [access,setAccess]= useState(false)
  let navigate= useNavigate()
  //aca seteamos el estado de access y seteamos la ruta a home
  function goHome(){
    setAccess(!access)
    navigate('/home')
  }
  //  este lo usamos para indicar que si no estamos en la ruta de inicio, mostramos el nav
  let location = useLocation()
  let isLocation= location.pathname==='/'

  return (
    <div className="App">
      {isLocation? 
        <Landing props={goHome}/> : <Nav />
      }
      <Routes>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
