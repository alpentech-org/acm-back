const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config');

const auth = require('./middleware/auth')

// Routes
const machinePeeringRoutes = require('./routes/machinePeering');
const userRoutes = require('./routes/user');

const app = express();

// Database connection middleware
const dbConnectionString = config.dbUrl + ':' + config.dbPort + '/' + config.dbName;
mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connexion à MongoDB/${config.dbName} réussie !`))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// CORS gestion
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/machinePeering', auth, machinePeeringRoutes);

app.use((req, res) => {
  res.json({
    message: 'Réponse Serveur !'
  });
});

module.exports = app;
