require('dotenv').config();
const axios = require('axios');
const API_KEY = process.env
const URL= 'https://api.thedogapi.com/v1/breeds'
const { Dog, Temperament } = require('./db');

const getApi= async ()=>{
  const response= await axios(URL)
  const data = response.data.map(dog=>{
    let tempArr= []
    if(dog.temperament) tempArr= dog.temperament.split(', ')

    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      breed: dog.breed_group,
      height: dog.height.metric,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      temperament: tempArr
    }

  })
  
  return data
}

const getDb = async () => {
    const response = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            },
        }
    })

    return response
};

const getAllDogs= async ()=>{
  const apiData= await getApi();
  const dbData= await getDb();
  const allData= apiData.concat(dbData);

  return allData
}

module.exports= getAllDogs