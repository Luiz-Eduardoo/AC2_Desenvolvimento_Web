const express = require('express');
const professorRouter = require('./routes/professor');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/professores', professorRouter);

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.get('/ola', (req, res) => {
    const nome = req.query.nome;
  res.json({ 'mensagem': `Olá, ` + nome + '!' });
});

app.get('/calcular-dobro/:numero', (req, res) => {
    const numero = parseFloat(req.params.numero);
    const dobro = numero * 2;
    res.json({ 'numero': numero, 'dobro': dobro });
});

app.post('/somar', (req, res) => {
    const num1 = req.body.num1;
    const num2 = req.body.num2;
    const soma = num1 + num2;
    res.json({ 'num1': num1, 'num2': num2, 'soma': soma });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

