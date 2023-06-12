const { Router } = require('express');
const { userController } = require('../controller');
const validateUser = require('../middlewares/validateUser');

const router = Router();

router.post('/', validateUser, userController.create);

module.exports = router;
