const { getApi } = require("../data")
const { Temperament } = require("../db")

const tempToDb= async (req,res)=>{
  try {
    //conseguimos todos los datos de la api con sus temperamentos
    const allTempData= await getApi()
    //hacemos un array con todos los temperamentos de nuestros dogs
    const temps= allTempData.map(temp=> temp.temperament)
    //lo llevamos a string, lo separamos por comas y los guardamos en un array
    const temperaments= temps.toString().split(', ' && ',')
    //a cada uno de los temperamentos le quitamos los espacios que tengan al principio o al final y lo guardamos en la base de datos
    temperaments.forEach(each => {
      const thisTemp=each.trim()
      Temperament.findOrCreate({
        where:{name:thisTemp}
      })
    });
    //traemos a todos los temperamentos
    const allTemps= await Temperament.findAll()
    //los devolvemos
    res.status(200).send(allTemps)

  } catch (error) {
    res.status(404).send({error:error.message})
  }
}

module.exports= tempToDb;