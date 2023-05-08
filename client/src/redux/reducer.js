
import { SHOW_ALL} from "./action-types"

const initialState= {
  allDogs: [],
}


const reducer= (state=initialState,action)=>{
  switch (action.type) {
    
    case SHOW_ALL:
      return {
        ...state,
        allDogs: action.payload,
      };
    default:
      return {...state}
  }
}

export default reducer;