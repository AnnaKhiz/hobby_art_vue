const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getOneItemById,
  addNewItem,
  updateItemData,
  removeItem
  } = require('../services/apiItems');

router.get('/', getAllItems );
router.get('/:id', getOneItemById );

router.post('/add', addNewItem );

router.patch('/update/:id', updateItemData );

router.delete('/remove/:id', removeItem );

module.exports = { router };
