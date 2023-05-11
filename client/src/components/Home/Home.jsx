import React from 'react';
import style from './Home.module.css';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import { useState } from 'react';

const Home = (props) => {
  //manipulamos los elementos de nuestro array de items para mostrarlos en pantalla y usarlos con el paginado
  const {dogs}=props
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

        return (
    <>
      { dogs.length === 0 ? <div className={style.loader}></div>
        :
        <div>
            <div className={style.cardsCont}>
              {newDog}
            </div>
            <div className={style.selects}>
            <select className={style.select}>
              <option value="Ordenar" disabled='disabled'>Ordered By</option>
              <option value="A">Ascendente</option>
              <option value="D">Descendiente</option>
            </select>
            <select className={style.select1}>
              <option value="Filtrar" disabled='disabled'>Filtered By</option>  
              <option value="Temperamentos">Temperamentos</option>
              <option value="Origen">Origen</option>
            </select>
            </div>
            <Paginado paginate={paginate} dogsInPag={dogsInPag} allDogs={dogs.length} pagAct={pagAct}/>
        </div>
      }
    </>
        )
}

export default Home;