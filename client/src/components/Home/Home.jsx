import React from 'react';
import style from './Home.module.css';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import {filterTemps} from '../../redux/actions'
import { useSelector } from 'react-redux';

const Home = (props) => {

  const dispatch= useDispatch();
  //manipulamos los elementos de nuestro array de items para mostrarlos en pantalla y usarlos con el paginado
  const {temperamentos}=props
  const dogs = useSelector(state => state.allDogs);
  console.log(dogs)
  //seteamos la pagina actual en 1
  const [pagAct, setPagAct] = useState(1);
  //cantidad de elementos por pagina
  const dogsInPag = 8;
  const lastIndex = pagAct * dogsInPag; 
  const firstIndex = lastIndex - dogsInPag;
  //elementos mostrados en la pagina
  const actualDogs = dogs.slice(firstIndex, lastIndex);

  //creamos la funcion para setear la pagina actual y la paginacion
  const paginate= (page)=>{
    setPagAct(page)
  }

  //creamos la funcion para crear los cards en base al array acortado a mostrar
   const newDog= actualDogs.map((dog)=>{
      return (
            <Card 
              key={dog.id}
              id={dog.id}
              image={dog.image}
              name={dog.name}
              temperament={dog.temperament}
              weight={dog.weight}
            />
      )
   });

   const temps= temperamentos.map(temp=>{
    return (
      <option value={temp.name} key={temp.id}>{temp.name}</option>
    )
   })

  const handleFilter = (event)=>{
    console.log(event.target.value)
    event.preventDefault();
    dispatch(filterTemps(event.target.value))
  }

        return (
    <div className={style.containerHome}>
      { dogs.length === 0 ? <div className={style.loader}></div>
        :
        <div>
            <div className={style.cardsCont}>
              {newDog}
            </div>
            <div className={style.selects}>
            <select className={style.select}>
              <option value="" disabled>Name</option>
              <option value="All" defaultValue>All</option>
              <option value="A">A-Z</option>
              <option value="D">Z-A</option>
            </select>
            <select className={style.selectPeso}>
              <option value="Ordenar" disabled='disabled'>Peso</option>
              <option value="All" defaultValue>All</option>
              <option value="A">Ascendente</option>
              <option value="D">Descendiente</option>
            </select>
            <select className={style.select1} onChange={handleFilter}>
              <option value="" disabled defaultValue>Temperamentos</option>  
              <option value="All" defaultValue>All</option>
              {temps}
            </select>
            <select className={style.select1}>
              <option value="" disabled>Dato</option>
              <option value="All" defaultValue>All</option>
              <option value="API">API</option>
              <option value="DB">DB</option>
            </select>
            </div>
            <Paginado paginate={paginate} dogsInPag={dogsInPag} allDogs={dogs.length} pagAct={pagAct}/>
        </div>
      }
    </div>
        )
}

export default Home;