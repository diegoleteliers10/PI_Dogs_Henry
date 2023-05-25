
import { DETAIL_DOG, DOG_BREED, FILTER_TEMPS, SHOW_ALL, SHOW_TEMPS, ORDERED_ABECE, ORDERED_WEIGHT, FILTER_BY_DATA, DELETE_DOG_SUCCESS, EDITED_DOG, SET_PAGE} from "./action-types"

const initialState= {
  allDogs: [],
  dogs:[],
  detail: [],
  allTemperaments:[],
  pagAct:1
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
        filterDogsTemp= allDogs.filter(dog => {
          let found = dog.temperament?.includes(action.payload)
          return found
        })
      }

      return {
        ...state,
        allDogs: filterDogsTemp,
      };

      case ORDERED_ABECE:
        let myDog=state.dogs
        let OrdDogsAbe = [];
        let orderedDogs= []
        if(action.payload === "All") {
          OrdDogsAbe = myDog
        }else{
        OrdDogsAbe =
        action.payload === "A-Z"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
        }
          OrdDogsAbe.forEach(dog => { orderedDogs.push(dog)});

      return {
        ...state,
        allDogs:orderedDogs,
        };

      case ORDERED_WEIGHT:
        let myDogs=state.dogs
        let typeOrd = [];
        let orderedWeightDogs= []
        if(action.payload === "All") {
          typeOrd = myDogs
        }else{
        typeOrd =
        action.payload === "A"
          ? state.allDogs.sort((a, b) => {
              const firtsWeight= a.weight.split(" - ")[1] || a.weight.split(" - ")[0];
              const secondWeight= b.weight.split(" - ")[1] || b.weight.split(" - ")[0];
              return firtsWeight - secondWeight;
            })
          : state.allDogs.sort((a, b) => {
              const firtsWeight= a.weight.split(" - ")[1] || a.weight.split(" - ")[0];
              const secondWeight= b.weight.split(" - ")[1] || b.weight.split(" - ")[0];
              return secondWeight - firtsWeight;
            })
        }
          typeOrd.forEach(dog => { orderedWeightDogs.push(dog)})

          return {
            ...state,
            allDogs:orderedWeightDogs,
          }


        case FILTER_BY_DATA:
          const todosPerros= state.dogs
          let filterDogsData = [];
          if(action.payload === 'All') {
            filterDogsData = todosPerros
          } else if(action.payload==='API') {
            todosPerros.forEach(dog => {
              if (typeof(dog.id)==='number') {
                filterDogsData.push(dog);
              }
            })
          } else{
            todosPerros.forEach(dog => {
              if (typeof(dog.id)==='string') {
                filterDogsData.push(dog);
              }
            })
          };

          return {
            ...state,
            allDogs: filterDogsData,
          };

        case DELETE_DOG_SUCCESS:
          return {
            ...state,
            allDogs: action.payload
          };

        case EDITED_DOG:
          return {
            ...state,
            allDogs: action.payload
          };

        case SET_PAGE:
          return {
            ...state,
            pagAct: action.payload
          };

    default:
      return {...state}
  }
}

export default reducer;