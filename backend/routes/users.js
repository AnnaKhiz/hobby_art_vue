const router = require('express').Router();
const { protectedRoute } = require('../middleware/route');
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
	deleteOneUser
} = require('../services/apiUsers')
router.get('/', async (req, res) => {
	res.send({ "result": "Server started here" })
})

// USER PAGES
router.get('/user', parserJwt, getAllPages );
router.get('/user/logout',  logoutUserPage );
router.post('/user/login', logInUserPage );
router.post('/register', registerNewUser );
router.patch('/user/edit', parserJwt, updateUserInfo );
router.delete('/:id', parserJwt, protectedRoute(['admin'], '/auth/login'), deleteOneUser);

// ADMIN PAGEs
router.get('/admin', parserJwt, protectedRoute(['admin']), uploadAdminPage );
router.post('/admin/login', logInToAdminPanel );
router.get('/admin/logout', logoutFromAdminPanel);


module.exports = { router };
