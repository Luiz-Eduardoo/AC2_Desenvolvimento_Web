const express = require('express');
const usuarioRouter = require('./routes/usuario');
const app = express();
const port = 3000;

   const professores = [
        { "id": 1, "nome": 'Prof Carlos', "idade": 40, "departamento": 'Matemática', "turmas": [
          {"codigo": '9A', "disciplina": 'MAT101', "alunos": ["João", "Maria", "Pedro"]},
            {"codigo": '10A', "disciplina": 'MAT201', "alunos": ["Ana", "Luiz"]}
        ]},
        { "id": 2, "nome": 'Prof Ana', "idade": 35, "departamento": 'História', "turmas": [
            {"codigo": '9A', "disciplina": 'HIS101', "alunos": ["João", "Pedro"]},
            {"codigo": '10B', "disciplina": 'HIS201', "alunos": ["Maria", "Carlos", "Luiza"]}
        ]},
        { "id": 3, "nome": 'Prof João', "idade": 50, "departamento": 'Ciências', "turmas": [
            {"codigo": '9A', "disciplina": 'CIE101', "alunos": ["João", "Maria"]}, 
            {"codigo": '9B', "disciplina": 'CIE101', "alunos": ["Pedro", "Luiz"]}
        ]}
    ];

app.use(express.json());

app.use('/usuario', usuarioRouter);

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

app.get('/professores', (req, res) => {
    res.json(professores);
});

app.get('/professores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const professor = professores.find(p => p.id === id);
    if (professor) {
        res.json(professor);
    } else {
        res.status(404).json({ message: 'Professor not found' });
    }
});

app.get('/professores/:id/turmas', (req, res) => {
    const id = parseInt(req.params.id);
    const professor = professores.find(p => p.id === id);
    if (professor) {
        res.json(professor.turmas);
    } else {
        res.status(404).json({ message: 'Professor not found' });
    }
});

app.put('/professores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const professorIndex = professores.findIndex(p => p.id === id);
    if (professorIndex !== -1) {
        const updatedData = req.body;
        professores[professorIndex] = { ...professores[professorIndex], ...updatedData };
        res.json(professores[professorIndex]);
    }
    else {
        res.status(404).json({ message: 'ID não existente' });
    }
});

app.post('/professores/:id/turmas', (req, res) => {
    const id = parseInt(req.params.id);
    const professor = professores.find(p => p.id === id);
    if (professor) {
        const novaTurma = req.body;
        professor.turmas.push(novaTurma);
        res.status(201).json({ message: 'Turma adicionada com sucesso!' });
    } else {
        res.status(404).json({ message: 'Professor não encontrado' });
    }
});

app.get('/professores/departamento/:departamento', (req, res) => {
    const departamento = req.params.departamento;
    const professoresDepartamento = professores.find(p => p.departamento.toLowerCase() === departamento.toLowerCase());
    res.json(professoresDepartamento);
});

app.delete('/professores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = professores.findIndex(p => p.id === id);

    if (index !== -1) {
        professores.splice(index, 1);
        res.json({ message: 'Professor deletado com sucesso!' });
    } else {
        res.status(404).json({ message: 'Id não existente' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

