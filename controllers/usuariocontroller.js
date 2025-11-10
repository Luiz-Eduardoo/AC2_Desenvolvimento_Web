const usuarios = [];

exports.getAllUsers = (req, res) => {
    res.json({usuarios});
};

exports.createUser = (req, res) => {
    const novoUsuario = req.body;
    usuarios.push(novoUsuario);
    res.status(201).json({
        'mensagem' : 'Usuário criado com sucesso!'
    });
};

exports.getProfessorbyId = (req, res) => {
    const userId = req.params.id;
    const usuario = usuarios.find(u => u.id == userId);
    
    if (!usuario) {
        return res.status(404).json({ 'mensagem': 'Usuário não encontrado' });
    }
    
    res.json(usuario);

};