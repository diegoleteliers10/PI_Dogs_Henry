const { Dog } = require('../db');
const { getAllDogs } = require('../helper/data');


const deleteDog = async (req, res) => {
  const { idDelete } = req.params;
  try {
    // Buscamos el perro por su ID
    const dog = await Dog.findByPk(idDelete);

    if (!dog) {
      return res.status(404).send({ message: 'Perro no encontrado' });
    }

    // Eliminamos los temperamentos asociados al perro
    await dog.setTemperaments([]);

    // Eliminamos el perro de la base de datos
    await dog.destroy();

    const newAllDogs= await getAllDogs();
    res.status(200).send(newAllDogs);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports= deleteDog;