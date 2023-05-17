import {SHOW_ALL, DETAIL_DOG, DOG_BREED, SHOW_TEMPS, FILTER_TEMPS, ORDERED_ABECE, ORDERED_WEIGHT, FILTER_BY_DATA} from "./action-types"
import axios from "axios";

//mostramos todos los perros
export const showAllDogs= () => {
    return async function (dispatch) {
        let dogs = await axios.get('http://localhost:3001/dogs');
        return dispatch({//necesario para despachar la accion
            type: SHOW_ALL,
            payload: dogs.data
        });
    }
};

//hacemos el filtrado de los temperamentos
export const filterTemps= (opcion) =>{
  return {type: FILTER_TEMPS, payload:opcion}
}

//filtrado de orden abecedario
export const orderDogsAbece=(payload)=>{
  return {type:ORDERED_ABECE, payload}
}

//traernos los detalles de cada perro
export function DogDetails(id) {
    return async function (dispatch) {
        try {
            let dogDetail = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: DETAIL_DOG,
                payload: dogDetail.data
            });
        } catch (error) {
            throw Error(error);
        }
    }
};

//encontrar las razas por nombre
export function getDogBreed(name) {
    return async function (dispatch) {
        let breedDogs = await axios.get(`http://localhost:3001/dog/name?nameRaza=${name}`);
        return dispatch({//necesario para despachar la accion
            type: DOG_BREED,
            payload: breedDogs.data
        });
    }
}

//traer a todos los temperamentos
export const getAllTemperaments=()=>{
    return async function (dispatch) {
        let dogs = await axios.get('http://localhost:3001/temperaments');
        return dispatch({//necesario para despachar la accion
            type: SHOW_TEMPS,
            payload: dogs.data
        });
    }
}

//ordenar por peso
export const orderByWeight= (payload)=>{
    return {type:ORDERED_WEIGHT, payload}
}

//filtrar por tipo de dato
export const filteredByData= (payload)=>{
    return {type:FILTER_BY_DATA, payload}
}

//para crear el perro en la db
export const createDog= (payload)=>{
    const {name, image, min_height,max_height, min_weight, max_weight, life_span, temperaments}=payload
    const createdDog= {name:name, image:image, height:`${min_height} - ${max_height}`, weight:`${min_weight} - ${max_weight}`, life_span:life_span, temperaments:temperaments.join(', ')}
    axios.post('http://localhost:3001/dogs', createdDog)
}