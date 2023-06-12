const { Router } = require('express');
const { userController } = require('../controller');
const validateUser = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.post('/', validateUser, userController.create);

router.get('/', validateToken, userController.getAll);

module.exports = router;
