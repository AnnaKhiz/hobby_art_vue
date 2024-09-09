const {Item, ObjectId} = require("../db");


async function getAllItems(req, res, next) {
  const items = await Item.find();

  if (!items) {
    res.send({ "result": false, items: [] });
  } else {
    res.send({ "result": true, items: items })
  }
}
async function getOneItemById(req, res, next) {
  const { id } = req.params;

  try {
    const item = await Item.findById({ _id: new ObjectId(id)});
    res.send({ "result": true, item: item });

  } catch (e) {
    console.log(e)
    res.send({ "result": false, item: {} });
  }
}
async function addNewItem(req, res, next) {
  const { body: item } = req;

  if (!item) return;

  try {
    const newItem = await new Item(item);
    const result = await newItem.save();
    res.send({ "result" : true, data: result });

  } catch (error) {
    res.send({ "result" : false, data: error });
  }
}
async function updateItemData(req, res, next) {
  const { id } = req.params;
  const { body: itemBody } = req;

  const item = await Item.find( { _id: new ObjectId(id)});

  if (!item) {
    res.send({"result" : false, data: "Item not found"})
  }

  try {
    const updatedItem = await Item.findOneAndUpdate({ _id: new ObjectId(id)}, itemBody, { new: true })
    res.send({"result": true, data: updatedItem})
  } catch (error) {
    console.log('update user error', error)
  }
}

async function removeItem(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Item.findByIdAndDelete({ _id: new ObjectId(id)});
    res.status(200).send({ "result": true, data: result });
  } catch (error) {
    console.log(error)
    res.status(404).send({ "result": false, data: `Remove item error: ${error}` });
  }
}

module.exports = {
  getAllItems,
  getOneItemById,
  addNewItem,
  updateItemData,
  removeItem
}
