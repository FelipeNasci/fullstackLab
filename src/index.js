const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const routes = require('./routes/routes')
const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname + '/views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, (err) => {
    if (err) console.log ('Server not start');
    else console.log ('Server start in port http://localhost:' + port);
});