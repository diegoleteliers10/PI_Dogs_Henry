import React from 'react';

import style from './Paginado.module.css';

const  Paginado = (props) => {

  const { dogsInPag, allDogs, paginate, pagAct}=props
  //creamos un array que contenga todos los numeros de paginas
    const pageNumbers =[];
    //calculamos el total de paginas
    const totalPag= Math.ceil(allDogs / dogsInPag)

    //agregamos los numeros de paginas al array
    for (let i = 1; i <= totalPag; i++) { 
        pageNumbers.push(i);
    }

    return(
        <div className={style.paginadoContainer}>
            <ul className={style.ulCont}>
                <li className={style.prevBut} onClick={() => pagAct > 1 && paginate(pagAct-1)} >Prev</li>
                {/* creamos todos los numeros como botones de una lista */}
                { pageNumbers && pageNumbers.map(number => (
                    <li className={style.pagEachButt} onClick={() => paginate(number)} key={number} tabIndex={0}>{number}</li>
                ))}
                <li className={style.nextBut} onClick={() => pagAct < totalPag && paginate(pagAct+1)} >Next</li>
            </ul>
        </div>
    )
}

export default Paginado;