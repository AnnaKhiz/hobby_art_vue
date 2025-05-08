const router = require('express').Router();

const {
	addNewFeedback,
	getFeedbackList
} = require('../services/apiFeedback.js')

router.get('/', getFeedbackList);
router.post('/add', addNewFeedback );

module.exports = { router }
