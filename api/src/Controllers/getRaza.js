const getAllDogs = require("../data");

const getRaza= async(req,res)=>{
  //pedimos por parametros el id de la raza
  const {idRaza}=req.params;

  try {
    //traemos a todos los dogs
    const allDogs= await getAllDogs()
    //los filtramos por id dado
    const dogs= allDogs.filter(dog=>dog.id===Number(idRaza))
    //si hay dogs filtrados por este id dado, los devolvemos, de no ser asi, decimos que no se encontro la raza
    if(dogs.length>0){res.status(200).send(dogs)}
    else{res.status(404).send("No se encontro la raza")}
  } catch (error) {
    res.status(500).send({error:error.message})
  }

}

module.exports=getRaza;