import {SHOW_ALL, FILTER, ORDER, DETAIL_DOG, DOG_BREED, FAV_DOG } from "./action-types"
import axios from "axios";

export const showAllDogs= () => {
    return async function (dispatch) {
        let dogs = await axios.get('http://localhost:3001/dogs');
        return dispatch({//necesario para despachar la accion
            type: SHOW_ALL,
            payload: dogs.data
        });
    }
};

export const filterDogs= (opcion) =>{
  return {type: FILTER, payload:opcion}
}

export const orderDogs=(opcion)=>{
  return {type:ORDER, payload:opcion}
}

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

export function getDogBreed(name) {
    return async function (dispatch) {
        let breedDogs = await axios.get(`http://localhost:3001/dog/name?nameRaza=${name}`);
        return dispatch({//necesario para despachar la accion
            type: DOG_BREED,
            payload: breedDogs.data
        });
    }
}

export const addFav = (dogy) => {
   const endpoint = 'http://localhost:3001/dog/fav';
   return async(dispatch) => {
      try{
         const {data}= await axios.post(endpoint, dogy);
         return dispatch({
            type: FAV_DOG,
            payload: data
         });
      }
      catch(error){
         console.log(error)
      }
   }

};