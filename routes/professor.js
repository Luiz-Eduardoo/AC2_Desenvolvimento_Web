const express = require('express');
const router = express.Router();
const profController = require('../controllers/professorcontroller');

router.get('/', profController.getAllProfessores);
router.get('/:id', profController.getProfessorbyId);
router.get('/:id/turmas', profController.getTurmasbyProfessorId);
router.put('/:id', profController.updateProfessorById);
router.post('/:id/turmas', profController.postTurmaToProfessor);
router.get('/departamento/:departamento', profController.getProfessorbyDepartamento);
router.delete('/:id', profController.deleteProfessorById);

module.exports = router;