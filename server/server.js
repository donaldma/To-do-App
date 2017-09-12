const ENV = process.env.ENV || "development";
const express = require('express');  
const app = express();
const http = require('http'); 
const server = http.createServer(app);
const cors = require('cors');
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const bodyParser  = require("body-parser");
const router = express.Router();
const dbHelper = require("./lib/dbHelper")(knex);
const knexLogger = require('knex-logger');
const apiRoutes = require("./routes/api");

app.use(cors());

app.use(knexLogger(knex));

app.set('view engine', 'ejs');

app.use('/styles', express.static('../styles/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/tasks', (req, res) => {
  res.render('index');
})

app.use('/api', apiRoutes(dbHelper));

app.use('/404', (req, res, next) => {
  res.status(404).render('404');
})

app.use('/500', (req, res, next) => {
  res.status(500).render('500');
})

app.use((req, res, next) => {
  res.redirect('/404');
})

server.listen( process.env.PORT || 9000, () => {
  console.log('Server running');
});