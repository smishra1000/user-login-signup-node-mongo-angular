var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');


router.post('/create', userController.createUser);

router.get('/getAll', userController.getAllUsers);

router.get('/:id', userController.getUser);

router.put('/:id/update', userController.updateUser);

router.delete('/:id/delete', userController.deleteUser);


module.exports = router;