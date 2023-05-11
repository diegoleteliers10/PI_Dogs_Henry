
import { DETAIL_DOG, DOG_BREED, FAV_DOG, SHOW_ALL} from "./action-types"

const initialState= {
  allDogs: [],
  detail: [],
  myFav:[]
}


const reducer= (state=initialState,action)=>{
  switch (action.type) {
    
    case SHOW_ALL:
      return {
        ...state,
        allDogs: action.payload,
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

    case FAV_DOG:
      return {
        ...state,
        myFav: action.payload,
      }
    default:
      return {...state}
  }
}

export default reducer;