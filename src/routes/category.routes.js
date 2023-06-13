const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const { categoryController } = require('../controller');

const router = Router();

router.post('/', validateToken, categoryController.create);

module.exports = router;
