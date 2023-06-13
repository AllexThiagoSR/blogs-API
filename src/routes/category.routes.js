const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const { categoryController } = require('../controller');
const validateName = require('../middlewares/validateName');

const router = Router();

router.post('/', validateToken, validateName, categoryController.create);

router.get('/', validateToken, categoryController.getAll);

module.exports = router;
