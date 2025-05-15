const router = require('express').Router();

const {
	addNewFeedback,
	getFeedbackList,
	getFeedbackById,
	getFeedbackByUserId,
} = require('../services/apiFeedback.js')
const {parserJwt} = require("../middleware/auth");
const {protectedRoute} = require("../middleware/route");

router.get('/', getFeedbackList);
router.get('/:id', getFeedbackById);
router.get('/user/:id', getFeedbackByUserId);
router.post('/add', addNewFeedback );

module.exports = { router }
