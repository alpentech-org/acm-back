const express = require('express');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Réponse Serveur !' });
});

module.exports = app;
