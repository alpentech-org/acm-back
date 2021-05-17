const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config/config');

const auth = require('./middleware/auth')

// Routes
const machinePeeringRoutes = require('./routes/machinePeering');
const userRoutes = require('./routes/user');
const ellisettingRoutes = require('./routes/ellisetting');
const coscomRoutes = require('./routes/coscom');
const contextsRoutes = require('./routes/contexts');

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
  if ('OPTIONS' == req.method) {
    res.sendStatus(204);
  } else {
    next();
  }
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/alpen-front')));

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

app.use('/api/ellisetting', auth, ellisettingRoutes);

app.use('/api/coscom', auth, coscomRoutes);

app.use('/api/machinePeering', auth, machinePeeringRoutes);

app.use('/api/contexts', auth, contextsRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/alpen-front/index.html'));
});

app.use((req, res) => {
  res.json({
    message: 'Réponse Serveur !'
  });
});

module.exports = app;
