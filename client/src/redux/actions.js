import {SHOW_ALL, ORDER, DETAIL_DOG, DOG_BREED, SHOW_TEMPS, FILTER_TEMPS } from "./action-types"
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

export const filterTemps= (opcion) =>{
  return {type: FILTER_TEMPS, payload:opcion}
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


export const getAllTemperaments=()=>{
    return async function (dispatch) {
        let dogs = await axios.get('http://localhost:3001/temperaments');
        return dispatch({//necesario para despachar la accion
            type: SHOW_TEMPS,
            payload: dogs.data
        });
    }
}