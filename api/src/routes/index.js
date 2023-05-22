const { Router } = require('express');
const getDogs = require('../Controllers/getDogs');
const getRaza = require('../Controllers/getRaza');
const getByName = require('../Controllers/getByName');
const postDog = require('../Controllers/postDog');
const tempToDb = require('../Controllers/tempToDb');
const deleteDog = require('../Controllers/deleteDogs');
const updateDog = require('../Controllers/updateDog');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');'


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//definimos las routes junto con sus controllers
router.get('/dogs', getDogs)

router.get('/dogs/:idRaza',getRaza)

router.get('/dog/name', getByName)

router.post('/dogs',postDog)

router.get('/temperaments',tempToDb)

router.delete('/dogs/:idDelete',deleteDog)

router.put('/dog/update/:idUpdate',updateDog)


module.exports = router;
