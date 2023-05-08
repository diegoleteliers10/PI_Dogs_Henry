const getAllDogs = require('../data')

const getDogs= async(req,res)=>{
  try {
    const allDogs= await getAllDogs()
    res.status(200).send(allDogs)
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

module.exports= getDogs;