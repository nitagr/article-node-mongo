const router = require('express').Router();
const articleController = require('../controllers/ArticleController');
const { checkToken } = require('../validations/tokenValidation');

// article routes
router.post('/', checkToken, articleController.createArticle);
router.get('/', checkToken, articleController.findAllArticles);
router.get('/:id', checkToken, articleController.findOneArticle);
router.put('/:id', checkToken, articleController.updateArticle);
router.delete('/:id', checkToken, articleController.deleteArticle);
router.delete('/', checkToken, articleController.deleteAllArticles);
router.post('/:id/upvote', checkToken, articleController.upvoteArticle);
router.post('/:id/downvote', checkToken, articleController.downvoteArticle);

module.exports = router;
