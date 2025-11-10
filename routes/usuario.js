const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuariocontroller');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserbyId);
router.post('/', userController.createUser);

module.exports = router;