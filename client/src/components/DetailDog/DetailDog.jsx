import { useParams } from "react-router-dom";
import { useEffect } from "react";
import style from './DetailDog.module.css'
import { useDispatch } from 'react-redux';
import { DogDetails } from "../../redux/actions";
import { useSelector } from "react-redux";

const DetailDog = ()=>{
    const dogDetail = useSelector(state => state.detail);

    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(DogDetails(id));
    }, [dispatch, id]);

  return (
    <div className={style.containerDet}>
    {dogDetail.length === 0 ? <div className={style.loader}></div>
    : <div className={style.containerDetail}>
          <img src={dogDetail[0].image} alt={dogDetail[0].name} className={style.imgDetail}/>
         <div className={style.containerDeInfo}>
          <h2 className={style.id}>{dogDetail[0].id}</h2>
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