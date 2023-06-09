import React from 'react';
import style from './Home.module.css';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import {filterTemps, orderByWeight, orderDogsAbece, filteredByData} from '../../redux/actions'
import { useSelector } from 'react-redux';
import { showAllDogs } from '../../redux/actions';
import { setPage } from '../../redux/actions';

const Home = (props) => {

  const dispatch= useDispatch();
  //traemos los temperamentos de la api
  const {temperamentos}=props
  //
  const dogs = useSelector(state => state.allDogs);
  console.log(dogs)
  
  //seteamos la pagina actual en 1, gracias a nuestro state en redux
  const pagAct = useSelector(state => state.pagAct);
  //cantidad de elementos por pagina
  const dogsInPag = 8;
  const lastIndex = pagAct * dogsInPag; 
  const firstIndex = lastIndex - dogsInPag;
  //elementos mostrados en la pagina
  const actualDogs = dogs?.slice(firstIndex, lastIndex);

  //creamos la funcion para setear la pagina actual y la paginacion junto a su dispatch
  const paginate= (page)=>{
    dispatch(setPage(page));
  }

  //creamos la funcion para crear los cards en base al array acortado a mostrar
   const newDog= actualDogs.map((dog)=>{
      return (
            <Card 
              key={dog.id}
              id={dog.id}
              image={dog.image}
              name={dog.name}
              temperament={dog.temperament?.split(", ").slice(0,3).join(", ")}
              weight={dog.weight}
            />
      )
   });

   //creamos la funcion para crear los temperamentos en options del select correspondiente y ademas filtramos los temperamentos para que muestren solo los que no esten vacios
   const tempsFiltrados= temperamentos.filter(temp=>temp.name!=="")
   const temps= tempsFiltrados.map(temp=>{
      return (
      <option value={temp.name} key={temp.id}>{temp.name}</option>
      )
   })

   //el useEffect nos ayuda a que cada vez que se produzca un cambio en el showAllDogs, se ejecute la funcion showAllDogs y se despache.
  useEffect(() => {
    dispatch(showAllDogs())
  }, [dispatch]);
   
   //creamos la funcion para despachar los actions
  const handleFilter = (event)=>{
    event.preventDefault();
    dispatch(filterTemps(event.target.value))
    setTimeout(() => {
      dispatch(setPage(1)); // Establecer la página actual en 1 después de 1 segundo
    });
  }
  //creamos la funcion para despachar los actions
  const handleOrdendAbecedario = (event)=>{
    event.preventDefault();
    dispatch(orderDogsAbece(event.target.value))
  }
//creamos la funcion para despachar los actions
  const handleWeightOrder = (event)=>{
    event.preventDefault();
    dispatch(orderByWeight(event.target.value))
  }
  //creamos la funcion para despachar los actions
  const handleByData = (event)=>{
    event.preventDefault();
    dispatch(filteredByData(event.target.value))
  }

        return (
    <div className={style.containerHome}>
      { !dogs.length ? <div className={style.loader}></div>
        :
        <div>
            <div className={style.cardsCont}>
              {newDog}
            </div>
            <div className={style.selects}>

            <select className={style.select} onChange={handleOrdendAbecedario}>
              <option value="" disabled>Name</option>
              <option value="All" defaultValue>All</option>
              <option value="A-Z" >A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>

            <select className={style.selectPeso} onChange={handleWeightOrder}>
              <option value="Ordenar" disabled>Peso</option>
              <option value="All" defaultValue>All</option>
              <option value="A">Ascendente</option>
              <option value="D">Descendiente</option>
            </select>

            <select className={style.select1} onChange={handleFilter}>
              <option value="" disabled>Temperamentos</option>  
              <option value="All" defaultValue>All</option>
              {temps}
            </select>

            <select className={style.select1} onChange={handleByData}>
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