const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5500',
  methods: ['GET']
}));

app.get('/usuarios', (req, res) => {
  res.json([
    { id: 1, nome: 'Ana' },
    { id: 2, nome: 'Carlos' }
  ]);
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
