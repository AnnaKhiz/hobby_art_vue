const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getOneItemById,
  addNewItem,
  updateItemData,
  removeItem,
	getRecommendedItems
  } = require('../services/apiItems');

router.get('/', getAllItems );
router.get('/:id', getOneItemById );
router.post('/recommended', getRecommendedItems)

router.post('/add', addNewItem );

router.patch('/update/:id', updateItemData );

router.delete('/remove/:id', removeItem );

module.exports = { router };
