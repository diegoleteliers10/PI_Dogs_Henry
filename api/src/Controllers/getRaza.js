const getAllDogs = require("../data");

const getRaza= async(req,res)=>{
  const {idRaza}=req.params;

  try {
    const allDogs= await getAllDogs()
    console.log(allDogs)
    const dogs= allDogs.filter(dog=>dog.id===Number(idRaza))
    if(dogs.length>0){res.status(200).send(dogs)}
    else{res.status(404).send("No se encontro la raza")}
  } catch (error) {
    res.status(500).send({error:error.message})
  }

}

module.exports=getRaza;