const router = require('express').Router();
const { protectedRoute } = require('../middleware/route');
const { checkDuplicateUser } = require('../middleware/checkDuplicateUser');
const { parserJwt } = require('../middleware/auth');
const {
	getAllPages,
	logoutUserPage,
	logInUserPage,
	registerNewUser,
	uploadAdminPage,
	updateUserInfo,
	logInToAdminPanel,
	logoutFromAdminPanel,
	deleteOneUser,
	toggleFavorites,
	getAllUsers,
	getAllFeedbacks,
	deleteFeedbackById
} = require('../services/apiUsers')
router.get('/', async (req, res) => {
	res.send({ "result": "Server started here" })
})

// USER PAGES

router.get('/user', parserJwt, getAllPages );
router.get('/user/logout',  logoutUserPage );
router.post('/user/login', logInUserPage );
router.post('/register', checkDuplicateUser, registerNewUser );
router.patch('/user/edit', parserJwt, updateUserInfo );
router.patch('/user/favorite', parserJwt, toggleFavorites);

// ADMIN PAGEs
router.get('/admin', parserJwt, protectedRoute(['admin']), uploadAdminPage );
router.post('/admin/login', logInToAdminPanel );
router.get('/admin/logout', logoutFromAdminPanel);
router.get('/admin/users', parserJwt, protectedRoute(['admin'], '/auth/login'), getAllUsers);
router.get('/admin/feedback', parserJwt, protectedRoute(['admin'], '/auth/login'), getAllFeedbacks);
router.delete('/:id', parserJwt, protectedRoute(['admin'], '/auth/login'), deleteOneUser);
router.delete('/admin/feedback/remove/:id', parserJwt, protectedRoute(['admin'], '/auth/login'), deleteFeedbackById);

module.exports = { router };
