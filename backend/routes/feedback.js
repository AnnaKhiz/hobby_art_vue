const router = require('express').Router();

const {
	addNewFeedback,
	getFeedbackList,
	getFeedbackById,
} = require('../services/apiFeedback.js');

router.get('/', getFeedbackList);
router.get('/:id', getFeedbackById);
router.post('/add', addNewFeedback );

module.exports = { router }
