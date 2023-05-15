import React from 'react'
import style from './Form.module.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {createDog} from '../../redux/actions'

const Form = () => {

  const temperamentos= useSelector(state=>state.allTemperaments)
  const filterTemperaments= []
  temperamentos.forEach(temp=> temp.name!==""? filterTemperaments.push(temp):null)

  const temps= filterTemperaments.map(temp=>{
      return (
        <option value={temp.name} key={temp.id}>{temp.name}</option>
      )
  })

  let [dogData,setData]=useState({
    name:'',
    image:'',
    min_height:'',
    max_height:'',
    min_weight:'',
    max_weight:'',
    life_span:'',
    temperaments:[],
  })
  console.log(dogData)

const handleChange = (event) => {
  const { name, value } = event.target;
  
  if (name === 'temperaments') {
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

const handleSubmit=async(event)=>{
    event.preventDefault()
    createDog(dogData)
    alert("Dog created successfully")
}

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
            <option name='temperaments' value="Temperamentos" selected disabled>Temperamentos</option>
            {temps}
          </select>

          <label for="link" className={style.imgUrl}>Link of the image:</label>
          <input type="url" id="link" name="image" placeholder="https://ejemplo.com/dsacds.png" className={style.inputImgForm} onChange={handleChange}></input>

          <button type='submit' className={style.buttonDogForm} onClick={handleSubmit}>Create Dog</button>
        </form>
      </div>

    </div>
  )
}

export default Form