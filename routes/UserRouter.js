const router = require('express').Router();
const userController = require('../controllers/UserController');

router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

module.exports = router;
