const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});


app.listen(8080, () => {
   console.log(`🚀 Servidor rodando`);
});
