const router = require('express').Router();
const { uploadFile } = require('../services/apiUploadFiles.js');
const { upload } = require("../middleware/upload.js");

router.post('/upload', upload.single('file'), uploadFile );


module.exports = { router }
