import { useParams } from "react-router-dom";
import { useEffect } from "react";
import style from './DetailDog.module.css'
import { useDispatch } from 'react-redux';
import { DogDetails } from "../../redux/actions";
import { useSelector } from "react-redux";

const DetailDog = ()=>{
  //usamos el estado de redux de detail
    const dogDetail = useSelector(state => state.detail);
  //traemos el dispatch y el id de parametros de la ruta
    const dispatch = useDispatch();
    let { id } = useParams();
  // usamos el useEffect para despachar nuestro id en la accion de redux
    useEffect(() => {
        dispatch(DogDetails(id));
    }, [dispatch, id]);

  return (
    <div className={style.containerDet}>
    {dogDetail.length === 0 ? <div className={style.loader}></div>
    : <div className={style.containerDetail}>
          <img src={dogDetail[0].image} alt={dogDetail[0].name} className={style.imgDetail}/>
         <div className={style.containerDeInfo}>
          <h2 className={style.id}>{
            id.length===1 ? id : id.slice(0,2)
          }</h2>
          <h2>{dogDetail[0].name}</h2>
          <p>Height: {dogDetail[0].height} cm</p>
          <p>Weight: {dogDetail[0].weight} kg</p>
          <p>Temperaments: {dogDetail[0].temperament}</p>
          <p>Life Span: {dogDetail[0].life_span}</p>
        </div>
      </div>

    }
    </div>
  )
}

export default DetailDog