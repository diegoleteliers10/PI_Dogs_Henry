require('dotenv').config();
const axios = require('axios');
const API_KEY = process.env
const URL= 'https://api.thedogapi.com/v1/breeds'
const { Dog, Temperament } = require('../db');

const getApi= async ()=>{
  //hacemos la peiticion a nuestra url
  const response= await axios(`${URL}?api_key=${API_KEY.API_KEY}`)
  //hacemos un map para extraerlos y agregarlos a un array
  const data = response.data.map(dog=>{

    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      breed: dog.breed_group,
      height: dog.height.metric,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      temperament: dog.temperament
    }

  })
  
  //devolvemos toda la data
  return data
}

const getDb = async () => {
  //traemos todos los perros que se encuentren en la base de datos incluyendo los temperamentos que se relacionan con ellos
    const response = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            },
        }
    })

    //devolvemos la data
    return response
};

const getAllDogs= async ()=>{
  //recolectamos tanto la data de la api como la de la base de datos
  const apiData= await getApi();
  const dbData= await getDb();
  //unimos ambas datas
  const allData= dbData.concat(apiData);
  //devolvemos la data completa
  return allData
}

module.exports= {
  getAllDogs,
  getApi
}