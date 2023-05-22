import React from 'react'
import style from './EditForm.module.css'
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useState } from 'react'
import {updateDog} from '../../redux/actions'

const EditForm = () => {
  //conseguimos al perro que queremos editar
  const {idEdit}=useParams()
  //nos traemos a los perros para buscar al perro a editar
  const allDogs=useSelector(state=>state.dogs)
  // aqui encontramos al perro, para mostrar sus valores al cliente, para que sepa que va a editar
  const dog=allDogs.find(dog=>dog?.id===idEdit)
  console.log(dog)

  let [newDogData,setNewData]=useState({
    id:dog?.id || "",
    name:"",
    min_height:"",
    max_height:"",
    min_weight:"",
    max_weight:"",
    life_span:"",
    temperaments:[],
  })

  console.log(newDogData)


  const handleChange = (event) => {
  const { name, value } = event.target;
  
  if (name === 'temperaments') {
    const newTemperamentos = [...newDogData.temperaments, value];
    setNewData({
      ...newDogData,
      [name]: newTemperamentos
    });
  } else if(name==='name'){
    const dogName= value.charAt(0).toUpperCase() + value.slice(1)
    setNewData({
      ...newDogData,
      [name]:dogName
    })
  }else {
    setNewData({
      ...newDogData,
      [name]: value,
    });
  }
};

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

  const handleSubmit=async(event)=>{
      event.preventDefault()
      if(newDogData.name!=="" && newDogData.min_height!=="" && newDogData.max_height!=="" && newDogData.min_weight!=="" && newDogData.max_weight!=="" && newDogData.life_span!=="" && newDogData.temperaments.length!==0){
        updateDog(newDogData)
        alert("Dog update successfully")
      };
      if(newDogData.name==="" && newDogData.min_height==="" && newDogData.max_height==="" && newDogData.min_weight==="" && newDogData.max_weight==="" && newDogData.life_span==="" && newDogData.temperaments.length===0){
        alert("Please fill in all the fields")
      }
  }
  
  return (
    <div className={style.EditContainer}>
      
      <div className={style.EditContent}>
        <form className={style.EditDog}>
          <h2 className={style.titleEdit}>Edit your dog</h2>

          <label htmlFor="name" className={style.nameEditForm}>Name:  {dog?.name}</label>
          <input className={style.inputForm} name='name' type="text" placeholder='New name' onChange={handleChange}/>

          <label htmlFor="min_height" className={style.labelEdit}>Min height:  {dog?.height.split(' - ')[0]}</label>
          <input className={style.inputForm} name='min_height' type="text" placeholder='New min height' onChange={handleChange}/>

          <label htmlFor="max_height" className={style.labelEdit}>Max height:  {dog?.height.split(' - ')[1]}</label>
          <input className={style.inputForm} name='max_height' type="text" placeholder='New max height' onChange={handleChange}/>


          <label htmlFor="min_weight" className={style.labelEdit}>Min weight:  {dog?.weight.split(' - ')[0]}</label>
          <input className={style.inputForm} name='min_weight' type="text" placeholder='New min weight' onChange={handleChange}/>


          <label htmlFor="max_weight" className={style.labelEdit}>Max weight:  {dog?.weight.split(' - ')[1]}</label>
          <input className={style.inputForm} name='max_weight' type="text" placeholder='New max weight' onChange={handleChange}/>

          <label htmlFor="life_span" className={style.lifeEditForm}>Life Span:  {dog?.life_span}</label>
          <input className={style.inputForm} name='life_span' type="text" placeholder='10 - 12 years' onChange={handleChange}/>

          <label htmlFor="temperaments" className={style.labelEditTemps}>Temperaments:  {dog?.temperament}</label>
          <select name="temperaments" className={style.selectForm} onChange={handleChange}>
            <option name='temperaments' value="Temperamentos" selected disabled >New Temperaments</option>
            {temps}
          </select>

          <button type='submit' className={style.buttonEditForm}  id='butonSubmit' onClick={handleSubmit}>Confirm your edit</button>
        </form>
      </div>

    </div>
  )
}

export default EditForm