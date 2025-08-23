const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// Outras rotas aqui...

module.exports = app;  // Exporte o app para Vercel
