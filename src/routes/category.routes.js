const { Router } = require('express');
const { categoryController } = require('../controller');
const { validateToken, validateName } = require('../middlewares');

const router = Router();

router.post('/', validateToken, validateName, categoryController.create);

router.get('/', validateToken, categoryController.getAll);

module.exports = router;
