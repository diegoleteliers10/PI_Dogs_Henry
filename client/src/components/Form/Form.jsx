import React from 'react'
import style from './Form.module.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {createDog} from '../../redux/actions'

const Form = () => {

  //treaemos los perros para poder comparar si ya esta creado o no
  const allDogs= useSelector(state=>state.allDogs)
  

  //traemos los temperamentos para usarlos al crear nuestro perro
  const temperamentos= useSelector(state=>state.allTemperaments)
  const filterTemperaments= []
  //filtramos los temperamentos para que se muestren los que existen
  temperamentos.forEach(temp=> temp.name!==""? filterTemperaments.push(temp):null)

  //traemos los temps para hacer options con ellos
  const temps= filterTemperaments.map(temp=>{
      return (
        <option value={temp.name} key={temp.id}>{temp.name}</option>
      )
  })

  let [isDisabled,setDisabled]= useState(true)

  //seteamos los valores del formulario
  let [dogData,setData]=useState({
    name:"",
    image:"",
    min_height:"",
    max_height:"",
    min_weight:"",
    max_weight:"",
    life_span:"",
    temperaments:[],
  })

  //cada vez que los valores de dogData cambien se ejecutara esta funcion, lo que de los values vera que mientras todos sean igual a "", el boton estara disabled y si todos son != a "" el boton esta habilitado
  useEffect(() => {
    const checkFormValidity = () => {
      const values = Object.values(dogData);
      const isValid = values.every(value => value !== "");
    
      setDisabled(!isValid);
    };

    checkFormValidity();
  }, [dogData]);

  //para guardar el cambio del form en nuestro state
const handleChange = (event) => {
  const { name, value} = event.target;
  
  if (name === 'temperaments') {
    if(dogData.temperaments.includes(value)) return null;
    const newTemperamentos = [...dogData.temperaments, value];
    setData({
      ...dogData,
      [name]: newTemperamentos
    });
  } else if(name==='name'){
    const dogName= value.charAt(0).toUpperCase() + value.slice(1)
    setData({
      ...dogData,
      [name]:dogName
    })
  }else {
    setData({
      ...dogData,
      [name]: value,
    });
  }
};

//para guardar el cambio de imagen del form en nuestro state
const handleImgChange=(event)=>{
  const imagen=  event.target.value
  const imageRegex= /^.*\.(jpg|jpeg|png)$/i
  console.log(document.upload)
  if(!imageRegex.test(imagen)){
    document.upload.src= "upload_vector.png"
    window.alert("Please upload a valid image")
  }
  else{
    setData({
      ...dogData,
      image: imagen,
    });
    document.upload.src= `${imagen}`
  }
}

//para eliminar los temperamentos del form
const handleDeleteTemperament = (temperament) => {
  const updatedTemperaments = dogData.temperaments.filter((temp) => temp !== temperament);
  setData({
    ...dogData,
    temperaments: updatedTemperaments,
  });
};


//para crear el perro 
const handleSubmit=async(event)=>{
    event.preventDefault()
    if(dogData.name!==""  && !allDogs.find(dog=> dog.name===dogData.name && dog.image===dogData.image && dog.min_height===dogData.min_height && dog.max_height===dogData.max_height && dog.min_weight===dogData.min_weight && dog.max_weight===dogData.max_weight && dog.life_span===dogData.life_span && dog.temperaments.length===dogData.temperaments.length)){
      createDog(dogData)
      alert("Dog created successfully")
    }else if(dogData.name==="" && dogData.image==="" && dogData.min_height==="" && dogData.max_height==="" && dogData.min_weight==="" && dogData.max_weight==="" && dogData.life_span==="" && dogData.temperaments.length===0){
      alert("Please fill in all the fields")
    }else{
      alert("This dog already exists")
    }
}

//validaciones de todas las areas del perro
const validationName=(doggy)=>{
  if(doggy.name===""){
    return false
  };
  if(/[0-9]/.test(doggy.name)){
    return true 
  }else{
    return false
  }
}

const validationHeight=(doggy)=>{
  if(doggy.min_height==="" || doggy.max_height===""){
    return false
  };
  if(Number(doggy.max_height)<Number(doggy.min_height) || Number(doggy.min_height)>Number(doggy.max_height)){
    return true 
  }else{
    return false
  }
}

const validationWeight=(doggy)=>{
  if(doggy.min_weight==="" || doggy.max_weight===""){
    return false
  };
  if(Number(doggy.max_weight)<Number(doggy.min_weight) || Number(doggy.min_weight)>Number(doggy.max_weight)){
    return true 
  }else{
    return false
  }
}

const validationLife=(doggy)=>{
  if(doggy.life_span===""){
    return false
  };
  if(!doggy.life_span.includes("-")){
    return true 
  }else if(!doggy.life_span.includes("years")){
    return true
  }else{
    return false
  }
}

  return (
    <div className={style.formContainer}>
      
      <div className={style.formContent}>
        <form className={style.formDog}>
          <h2 className={style.titleForm}>Create your dog</h2>

          <label htmlFor="name" className={style.nameDogForm}>Name </label>
          <input className={style.inputForm} name='name' type="text" placeholder='Name of your dog' onChange={handleChange}/>
          {validationName(dogData) && <p className={style.pErrorName}>Can't have numbers</p>}

          <label htmlFor="min_height">Min height </label>
          <input className={style.inputForm} name='min_height' type="text" placeholder='Min height' onChange={handleChange}/>
          {validationHeight(dogData) && <p className={style.pErrorMinHeight}>Must be less than max</p>}

          <label htmlFor="max_height">Max height </label>
          <input className={style.inputForm} name='max_height' type="text" placeholder='Max height' onChange={handleChange}/>
          {validationHeight(dogData) && <p className={style.pErrorMaxHeight}>Must be greater than min</p>}

          <label htmlFor="min_weight">Min weight </label>
          <input className={style.inputForm} name='min_weight' type="text" placeholder='Main weight' onChange={handleChange}/>
          {validationWeight(dogData) && <p className={style.pErrorMinWeight}>Must be less than max</p>}

          <label htmlFor="max_weight">Max weight </label>
          <input className={style.inputForm} name='max_weight' type="text" placeholder='Max weight' onChange={handleChange}/>
          {validationWeight(dogData) && <p className={style.pErrorMaxWeight}>Must be greater than min</p>}

          <label htmlFor="life_span" className={style.lifeDogForm}>Life Span</label>
          <input className={style.inputForm} name='life_span' type="text" placeholder='10 - 12 years' onChange={handleChange}/>
          {validationLife(dogData) && <p className={style.pErrorLife}>Must be "X - X years" format</p>}

          <label htmlFor="temperaments" className={style.temperamentsForm}>Choose temperaments</label>
          <select name="temperaments" className={style.selectForm} onChange={handleChange}>
            <option name='temperaments' value="Temperamentos" defaultValue disabled>Temperamentos</option>
            {temps}
          </select>

          <label htmlFor="image" className={style.imgUrl}>Upload a image:</label>
          <input type="text" name="image" onChange={handleImgChange} className={style.inputImgForm} placeholder='Image URL'/>
          <img src='upload_vector.png' alt="upload" name='upload' className={style.imgUpload}/>

          

          <button type='submit' className={style.buttonDogForm} onClick={handleSubmit} id='butonSubmit' disabled={isDisabled}>Create Dog</button>
        </form>

        {dogData.temperaments.length !== 0 && (
          <div className={style.tempsContainer}>
            {dogData.temperaments.map((temperament) => (
              <div className={style.eachTemps} key={temperament}>
                <p className={style.textDeleteTemp}>{temperament}</p>
                <button
                  className={style.buttonDeleteTemp}
                  value={temperament}
                  onClick={() => handleDeleteTemperament(temperament)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Form