import {SHOW_ALL, FILTER, ORDER } from "./action-types"
import axios from "axios";

export const showAllDogs= () => {
    return async function (dispatch) {
        var dogs = await axios.get('http://localhost:3001/dogs');
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