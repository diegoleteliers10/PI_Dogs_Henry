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

    if(dog.id)
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
  });

  //de la respuesta de los datos de la db haga un mapeado donde devuelva un objeto con todos las propiedades de la db y que el temperamento sea igual a su propiedad temperaments donde tomamos los nombres y les hacemos un join para que quede como string
  const dogsWithTemperaments = response.map(dog => ({
    ...dog.dataValues,
    temperament: dog.temperaments.map(temp => temp.name).join(', ')
  }));

  return dogsWithTemperaments;
};

const getAllDogs= async ()=>{
  //recolectamos tanto la data de la api como la de la base de datos
  const [apiData, dbData] = await Promise.all([getApi(), getDb()]);
  //unimos ambas datas
  const allData= dbData.concat(apiData);
  //devolvemos la data completa
  return allData
}

module.exports= {
  getAllDogs,
  getApi
}