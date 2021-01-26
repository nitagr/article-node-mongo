const articleController = require('../controllers/ArticleController');
const commentController = require('../controllers/CommentController');
const authController = require('../controllers/AuthController');

var router = require("express").Router();

//article routes
router.post('/', articleController.createArticle);
router.get('/', articleController.findAllArticles);
router.get('/:id', articleController.findOneArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);
router.delete('/',articleController.deleteAllArticles);
router.post('/:id/comments', commentController.commentArticle);

//sign up && login routes

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);
router.get('/users', authController.users);

module.exports = router
