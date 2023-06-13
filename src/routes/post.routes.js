const { Router } = require('express');
const { postController } = require('../controller');
const { validateToken, validatePost, validateUpdatePost } = require('../middlewares');

const router = Router();

router.post('/', validateToken, validatePost, postController.create);

router.get('/', validateToken, postController.getAll);

router.get('/:id', validateToken, postController.getById);

router.put('/:id', validateToken, validateUpdatePost, postController.update);

module.exports = router;
