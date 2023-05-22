const { Dog, Temperament} = require('../db');
const { getAllDogs } = require('../helper/data');


const deleteDog = async (req, res) => {
  const { idUpdate, name, temperaments, weight, height, life_span } = req.params;
  try {
    //SETEAMOS LOS NUEVOS DATOS
    const dog = await Dog.update(
      { name: name, height:height, weight:weight, life_span:life_span},
      { where: { id: idUpdate } }
    );
    //ELIMINAMOS LOS TEMPERAMENTOS ANTERIORES
    await dog.setTemperaments([]);

    //AGREGAMOS LOS NUEVOS TEMPERAMENTOS 
    const temp= temperaments.split(', ')
    temp.forEach(async(e)=>{
      const dogTemp= await Temperament.findAll({where:{name:e}})
      dog.addTemperament(dogTemp)
    })

    //traemos a todos los perros
    const newAllDogs= await getAllDogs();
    res.status(200).send(newAllDogs);

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports= deleteDog;