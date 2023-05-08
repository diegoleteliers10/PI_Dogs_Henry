const { Dog, Temperament } = require('../db');


const postDog= async(req,res)=>{
  //traemos los parametros necesarios por body
  const {image,name,height,weight,life_span,temperaments}=req.body;
  try {
    //creamos el dog en nuestra base de datos
    const createdDog = await Dog.create({
        image,
        name,
        height,
        weight,
        life_span,
    })

    //de los temperamentos que nos pasan por body que pueden ser tipo 'happy' o 'happy, sad' y mas...los separamos por comas y se guardan en un array, luego recorremos ese array y buscamos en nuestra base de datos el temperamento que coincida con el nombre del array
    const temp= temperaments.split(', ')
    temp.forEach(async(e)=>{
    const dogTemp= await Temperament.findAll({where:{name:e}})
    createdDog.addTemperament(dogTemp)
    })

    //enviamos un mensaje de confirmacion
    res.status(200).send({message:'Dog created'})


  } catch (error) {
    res.status(500).send({message:error.message})
  }

}

module.exports= postDog;
