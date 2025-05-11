const multer = require('multer');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../uploads');

if (!fs.existsSync(filePath)) {
	fs.mkdirSync(filePath, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, filePath);
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, Date.now() + ext);
	}
});

const upload = multer({ storage});

module.exports = { upload };
