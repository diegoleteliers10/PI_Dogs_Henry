const getAllDogs = require("../data");

const getByName= async (req,res)=>{
  //pedimos el nameRaza por query, asi conseguimos por nombre cada dog
  const {nameRaza}= req.query;
  //hacemos el regex para que vea si es parecido y que no importe si parte con mayuscula o minuscula
  const rex= new RegExp(nameRaza, 'i');
  try {
    //traemos todos los dogs y filtramos por el nameRaza
    const allDogs= await getAllDogs();
    const dog= allDogs.filter(dogs=> rex.test(dogs.name));
    //preguntamos si hay dogs relacionado con el nameRaza y  si es asi retornamos el status 200 y el dog, sino retornamos el status 404 y el error
    dog.length
    ? res.status(200).json(dog)
    : res.status(404).json({error: "No se encontro la raza"})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

module.exports= getByName;