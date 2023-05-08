const { Router } = require('express');
const getDogs = require('../Controllers/getDogs');
const getRaza = require('../Controllers/getRaza');
const getByName = require('../Controllers/getByName');
const postDog = require('../Controllers/postDog');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');'


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//para encontrar un array con todos los perros
router.get('/dogs', getDogs)

router.get('/dogs/:idRaza',getRaza)

router.get('/dog/name', getByName)

router.post('/dogs',postDog)

router.get('/temperaments',)


module.exports = router;
