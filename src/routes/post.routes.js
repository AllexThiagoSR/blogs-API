const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const { postController } = require('../controller');
const validatePost = require('../middlewares/validatePost');

const router = Router();

router.post('/', validateToken, validatePost, postController.create);

router.get('/', validateToken, postController.getAll);

router.get('/:id', validateToken, postController.getById);

router.put('/:id', validateToken, postController.update);

module.exports = router;
