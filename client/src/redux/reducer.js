
import { DETAIL_DOG, DOG_BREED, FILTER_TEMPS, SHOW_ALL, SHOW_TEMPS, ORDERED_ABECE, ORDERED_WEIGHT} from "./action-types"

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

      case ORDERED_ABECE:
        const allDoggs= state.dogs
        let OrdDogsAbe = [];
        let orderedDogs= []
        OrdDogsAbe =
        action.payload === "A-Z"
          ? allDoggs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : allDoggs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
          OrdDogsAbe.forEach(dog => { orderedDogs.push(dog)});

      return {
        ...state,
        allDogs:orderedDogs,
        };

      case ORDERED_WEIGHT:
        let typeOrd = [];
        let orderedWeightDogs= []
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
          typeOrd.forEach(dog => { orderedWeightDogs.push(dog)})

          return {
            ...state,
            allDogs:orderedWeightDogs,
          }

    default:
      return {...state}
  }
}

export default reducer;