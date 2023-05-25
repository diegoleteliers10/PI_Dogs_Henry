import {SHOW_ALL, DETAIL_DOG, DOG_BREED, SHOW_TEMPS, FILTER_TEMPS, ORDERED_ABECE, ORDERED_WEIGHT, FILTER_BY_DATA, DELETE_DOG_SUCCESS, SET_PAGE} from "./action-types"
import axios from "axios";

//mostramos todos los perros
export const showAllDogs = () => {
  return async function (dispatch) {
    try {
      let dogs = await axios.get('https://dogsapi-b2s8.onrender.com/dogs');
      return dispatch({
        type: SHOW_ALL,
        payload: dogs.data
      });
    } catch (error) {
      // Manejo del error
      return dispatch({
        type : SHOW_ALL,
        payload : error.message
      });
    }
  };
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
            let dogDetail = await axios.get(`https://dogsapi-b2s8.onrender.com/dogs/${id}`)
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
        let breedDogs = await axios.get(`https://dogsapi-b2s8.onrender.com/dog/name?nameRaza=${name}`);
        return dispatch({//necesario para despachar la accion
            type: DOG_BREED,
            payload: breedDogs.data
        });
    }
}

//traer a todos los temperamentos
export const getAllTemperaments = () => {
  return async function (dispatch) {
    try {
      let dogs = await axios.get('https://dogsapi-b2s8.onrender.com/temperaments');
      return dispatch({
        type: SHOW_TEMPS,
        payload: dogs.data
      });
    } catch (error) {
      // Manejo del error
      return dispatch({
        type : SHOW_TEMPS,
        payload : error.message
      });
    }
  };
};

//ordenar por peso
export const orderByWeight= (payload)=>{
    return {type:ORDERED_WEIGHT, payload}
}

//filtrar por tipo de dato
export const filteredByData= (payload)=>{
    return {type:FILTER_BY_DATA, payload}
}

//para crear el perro en la db
export const createDog= async (payload)=>{
    const {name, image, min_height,max_height, min_weight, max_weight, life_span, temperaments}=payload
    const createdDog= {name:name, image:image, height:`${min_height} - ${max_height}`, weight:`${min_weight} - ${max_weight}`, life_span:life_span, temperaments:temperaments.join(', ')}
    await axios.post('https://dogsapi-b2s8.onrender.com/dogs', createdDog)
}

//para eliminar al perro
export const deleteDog = (id) => {
   const endpoint = `https://dogsapi-b2s8.onrender.com/dogs/${id}`;
   return async(dispatch) => {
      try{
         const response= await axios.delete(endpoint);
         dispatch({
            type: DELETE_DOG_SUCCESS,
            payload: response.data
         })
      }
      catch(error){
         return {
            type:Error,
            payload:error
         }
      }
   }
}; 

//hacemos update de cada perro, lo que hace que se actualice la db sin necesidad de despachar nuevamente todos los perros.
export const updateDog= async (payload)=>{
  const {idUpdate,name, min_height,max_height, min_weight, max_weight, life_span, temperaments}=payload
  const editedDog= {name:name, height:`${min_height} - ${max_height}`, weight:`${min_weight} - ${max_weight}`, life_span:life_span, temperaments:temperaments.join(', ')}
  await axios.put(`https://dogsapi-b2s8.onrender.com/dog/update/${idUpdate}`, editedDog)
}

//para setear las paginas
export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page
  };
};