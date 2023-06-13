const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const { postController } = require('../controller');

const router = Router();

router.post('/', validateToken, postController.create);

module.exports = router;
