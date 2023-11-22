var express = require('express');
var router = express.Router();
const controllers = require('../controllers/controllers.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/personas', controllers.listaPersonas);

router.get('/agregarPersona', controllers.agregarPersona)
router.post('/agregarPersona',controllers.postAgregarPersona);

router.get('/edit/:id', controllers.getEditarPersona);
router.post('/update/:id', controllers.postUpdatePersona);

router.get('/delete/:id', controllers.getDeletePersona);
router.post('/delete/:id', controllers.postDeletePersona);

router.get('/buscar', controllers.buscarPersona);
router.post('/resultados', controllers.buscarPersonaResultados);

module.exports = router;
