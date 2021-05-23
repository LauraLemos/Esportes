const express = require('express')

const routes = express.Router()
const upload = require('../config/multer')

const usuarioController = require('../controller/usuarioController')

//list
routes.get('/',usuarioController.list)

//filtro
routes.post('/',usuarioController.filtro)

//abre add
routes.get('/add',usuarioController.abreadd)

//add
routes.post('/add',upload.Single('foto'),usuarioController.add)

//abre edit
routes.get('/edit/:id',usuarioController.abreedit)

//edit
routes.post('/edit/:id',upload.Single('foto'),usuarioController.edit)

//del
routes.get('/del/:id',usuarioController.del)

module.exports = routes;