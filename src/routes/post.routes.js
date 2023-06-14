const { Router } = require('express');
const { postController } = require('../controller');
const { validateToken, validatePost, validateUpdatePost } = require('../middlewares');

const router = Router();

router.post('/', validateToken, validatePost, postController.create);

router.get('/', validateToken, postController.getAll);

router.get('/search', validateToken, postController.search);

router.get('/:id', validateToken, postController.getById);

router.put('/:id', validateToken, validateUpdatePost, postController.update);

router.delete('/:id', validateToken, postController.destroy);

module.exports = router;
