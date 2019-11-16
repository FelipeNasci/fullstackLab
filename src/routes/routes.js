const express = require('express');
const googleSpreadsheet = require('../controller/googleSpreadsheet')

const routes = express.Router();

routes.get('/', (req, res) => { return res.render('home') })
routes.post('/', googleSpreadsheet.writeSpreadsheet);

module.exports = routes;