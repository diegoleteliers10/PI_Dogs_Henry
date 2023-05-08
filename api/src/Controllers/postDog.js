const { Dog, Temperament } = require('../db');


const postDog= async(req,res)=>{
  const {image,name,height,weight,life_span,temperaments}=req.body;
  try {
    const createdDog = await Dog.create({
        image,
        name,
        height,
        weight,
        life_span,
    })

    const dogTemp= await Temperament.findAll({
      where : {name: temperaments}
    })

    createdDog.addTemperament(dogTemp)

    res.status(200).send({message:'Dog created'})


  } catch (error) {
    res.status(500).send({message:error.message})
  }

}

module.exports= postDog;
