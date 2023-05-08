const getAllDogs = require("../data");

const getByName= async (req,res)=>{
  const {nameRaza}= req.query;
  const rex= new RegExp(nameRaza, 'i');
  try {
    const allDogs= await getAllDogs();
    const dog= allDogs.filter(dogs=> rex.test(dogs.name));
    dog.length
    ? res.status(200).json(dog)
    : res.status(404).json({error: "No se encontro la raza"})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

module.exports= getByName;