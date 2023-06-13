const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const { postController } = require('../controller');
const validatePost = require('../middlewares/validatePost');

const router = Router();

router.post('/', validateToken, validatePost, postController.create);

module.exports = router;
