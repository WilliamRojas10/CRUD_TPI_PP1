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
//////OFICINA
router.get('/oficinas', controllers.listaOficinas)
router.get('/agregarOficina', controllers.agregarOficina)
router.post('/agregarOficina', controllers.postAgregarOficina)
router.get('/deleteOficina/:id', controllers.getDeleteOficina)
router.post('/deleteOficina/:id', controllers.postDeleteOficina)
router.get('/editarOficina/:id', controllers.getEditarOficina)
router.post('/updateOficina/:id', controllers.postUpdateOficina)
router.get('/buscarOficina', controllers.buscarOficina);
router.post('/oficinaResultados', controllers.buscarOficinaResultados);

module.exports = router;
