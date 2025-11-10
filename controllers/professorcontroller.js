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

exports.getAllProfessores = (req, res) => {
    res.json(professores);
};

exports.getProfessorbyId = (req, res) => {
    const id = parseInt(req.params.id);
    const professor = professores.find(p => p.id === id);
    if (professor) {
        res.json(professor);
    } else {
        res.status(404).json({ message: 'Professor not found' });
    }
};

exports.getTurmasbyProfessorId = (req, res) => {
    const id = parseInt(req.params.id);
    const professor = professores.find(p => p.id === id);
    if (professor) {
        res.json(professor.turmas);
    } else {
        res.status(404).json({ message: 'Professor not found' });
    }
};

exports.updateProfessorById = (req, res) => {
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
};

exports.postTurmaToProfessor = (req, res) => {
    const id = parseInt(req.params.id);
    const professor = professores.find(p => p.id === id);
    if (professor) {
        const novaTurma = req.body;
        professor.turmas.push(novaTurma);
        res.status(201).json({ message: 'Turma adicionada com sucesso!' });
    } else {
        res.status(404).json({ message: 'Professor não encontrado' });
    }
};
exports.getProfessorbyDepartamento = (req, res) => {
    const departamento = req.params.departamento;
    const professoresDepartamento = professores.find(p => p.departamento.toLowerCase() === departamento.toLowerCase());
    res.json(professoresDepartamento);
};

exports.deleteProfessorById = (req, res) => {
    const id = parseInt(req.params.id);
    const index = professores.findIndex(p => p.id === id);

    if (index !== -1) {
        professores.splice(index, 1);
        res.json({ message: 'Professor deletado com sucesso!' });
    } else {
        res.status(404).json({ message: 'Id não existente' });
    }
};