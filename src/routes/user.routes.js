const { Router } = require('express');
const { userController } = require('../controller');
const validateUser = require('../middlewares/validateUser');
const { validateToken } = require('../middlewares');

const router = Router();

router.post('/', validateUser, userController.create);

router.get('/', validateToken, userController.getAll);

router.get('/:id', validateToken, userController.getById);

router.delete('/me', validateToken, userController.destroy);

module.exports = router;
