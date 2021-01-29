const router = require('express').Router({ mergeParams: true });
const commentController = require('../controllers/CommentController');
const { checkToken } = require('../validations/tokenValidation');

router.post('/:id/comment', checkToken, commentController.commentArticle);
router.get('/:id/comment', checkToken, commentController.findComments);

module.exports = router;
