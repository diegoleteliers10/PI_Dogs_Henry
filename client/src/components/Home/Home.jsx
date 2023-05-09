import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { showAllDogs } from '../../redux/actions';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import styles from './Home.module.css'
import { Link } from 'react-router-dom';

//manipulamos los elementos de nuestro array de items para mostrarlos en pantalla y usarlos con el paginado
function Items({ currentItems }) {
  return (
    <div className={styles.itemsContainer}>
      {currentItems &&
        currentItems.map((dog) => (
          <div className={styles.cardDog} >
            <img src={dog.image} alt={dog.name} className={styles.imgDog}/>
            <section className={styles.cardInfo}>
              <Link to={`about${dog.id}`} className={styles.linkName}>{dog.name}</Link>
              <p>{dog.temperament}</p>
              <p>Peso: {dog.weight} kg</p>
            </section>

          </div>
        ))}
    </div>
  );
}

function PaginatedItems({ itemsPerPage, items }) {
  // Aquí usamos compensaciones de elementos; también podríamos usar desplazamientos de página
  // siguiendo la API o los datos con los que está trabajando.
  const [itemOffset, setItemOffset] = useState(0);

  
// Se tiene la obtención de elementos de la api.
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invocar cuando el usuario haga clic para solicitar otra página.
  const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % items.length;
  setItemOffset(newOffset);
};

return (
  <div className={styles.ulPag}>
    <Items currentItems={currentItems} />
    <ReactPaginate
      breakLabel="-"
      nextLabel="Next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="Previous"
      renderOnZeroPageCount={null}
      containerClassName={styles.pagination}
      activeClassName={styles.activePag}
    />
  </div>
)}

const Home = () => {

  const allDogs = useSelector(state => state.allDogs);
  const dispatch = useDispatch();

  console.log(allDogs)

  useEffect(()=>{
    dispatch(showAllDogs())
  },[dispatch])

  return (
    <PaginatedItems items={allDogs} itemsPerPage={8}/>
  )
}

export default Home;