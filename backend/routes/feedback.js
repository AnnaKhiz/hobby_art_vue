const router = require('express').Router();

const {
	addNewFeedback
} = require('../services/apiFeedback.js')


router.post('/add', addNewFeedback );

module.exports = { router }
