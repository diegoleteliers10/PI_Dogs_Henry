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

    //buscamos los temperamentos en nuestra base de datos
    const dogTemp= await Temperament.findAll({
      where : {name: temperaments}
    })
     
    //agregamos los temperamentos al dog
    createdDog.addTemperament(dogTemp)

    //enviamos un mensaje de confirmacion
    res.status(200).send({message:'Dog created'})


  } catch (error) {
    res.status(500).send({message:error.message})
  }

}

module.exports= postDog;
