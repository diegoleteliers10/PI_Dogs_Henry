import { Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/LandingPage/Landing';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import { useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import DetailDog from './components/DetailDog/DetailDog';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showAllDogs } from './redux/actions';
import {getAllTemperaments} from  './redux/actions'
import Form from './components/Form/Form';






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

  const allDogs = useSelector(state => state.allDogs);
  console.log(allDogs)
  const allTemperaments = useSelector(state => state.allTemperaments);
  const dispatch = useDispatch(); 

  useEffect(()=>{
    dispatch(showAllDogs()) //despachamos nuestra funcion showAllDogs de donde obtenemos todos los dogs
    dispatch(getAllTemperaments())
  },[dispatch])

  return (
    <div className="App">
      {isLocation? 
        <Landing props={goHome}/> : <Nav dogs={allDogs} />
      }
      <Routes>
        <Route path='/home' element={<Home temperamentos={allTemperaments}/>}/>
        <Route path='/detail/:id' element={<DetailDog/>}/>
        <Route path='/formDog' element={<Form />}/>
        
      </Routes>
    </div>
  );
}

export default App;
