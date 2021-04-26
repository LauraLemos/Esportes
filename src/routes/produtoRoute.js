const express = require('express')

const routes = express.Router()

//list
routes.get('/',)

//filtro
routes.post('/',)

//abre add
routes.get('/add',)

//add
routes.post('/add',)

//abre edit
routes.get('/edt/:id',)

//edit
routes.post('/edt/:id',)

//del
routes.get('/del/:id',)

module.exports = routes;