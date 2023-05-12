
import { DETAIL_DOG, DOG_BREED, FILTER_TEMPS, SHOW_ALL, SHOW_TEMPS} from "./action-types"

const initialState= {
  allDogs: [],
  dogs:[],
  detail: [],
  allTemperaments:[]
}


const reducer= (state=initialState,action)=>{
  switch (action.type) {
    
    case SHOW_ALL:
      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload,
      };

    case DETAIL_DOG:
      console.log(action.payload)
      return {
        ...state,
        detail: action.payload,
      };
    
    case DOG_BREED:
      return {
        ...state,
        allDogs: action.payload,
      };

    case SHOW_TEMPS:
      return {
        ...state,
        allTemperaments: action.payload,
      };

    case FILTER_TEMPS:
      const allDogs= state.dogs
      let filterDogsTemp = [];
      if(action.payload === 'All') {
        filterDogsTemp = allDogs
      } else {
        allDogs.forEach(dog => {
          let found = dog.temperament?.includes(action.payload)
          if (found) {
            filterDogsTemp.push(dog);
          }
        })
      }

      return {
        ...state,
        allDogs: filterDogsTemp,
      };

    default:
      return {...state}
  }
}

export default reducer;