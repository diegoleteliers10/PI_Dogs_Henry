const { Dog, Temperament} = require('../db');
const { getAllDogs } = require('../helper/data');


const updateDog = async (req, res) => {
  const { name, temperaments, weight, height, life_span } = req.body;
  const { idUpdate } = req.params;

  try {
    // Buscamos el perro por su ID
    const dog = await Dog.findByPk(idUpdate);

    if (!dog) {
      return res.status(404).send({ message: 'Perro no encontrado' });
    }

    // Actualizamos los datos del perro
    dog.name = name;
    dog.weight = weight;
    dog.height = height;
    dog.life_span = life_span;
    // Guardamos los cambios en la base de datos
    await dog.save();

    //ELIMINAMOS LOS TEMPERAMENTOS ANTERIORES
    await dog.setTemperaments([]);

    //AGREGAMOS LOS NUEVOS TEMPERAMENTOS 
    const temp= temperaments.split(', ')
    temp.forEach(async(e)=>{
      const dogTemp= await Temperament.findAll({where:{name:e}})
      dog.addTemperament(dogTemp)
    })

    const newAllDogs = await getAllDogs();
    res.status(200).send(newAllDogs);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports= updateDog;