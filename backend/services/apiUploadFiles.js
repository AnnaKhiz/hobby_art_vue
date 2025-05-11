
function uploadFile(req, res, next) {
	const { file } = req;

	if (!file) {
		return res.status(404).send({ result: false, file: null })
	}
	res.send({ result: true, file })
}

module.exports = {
	uploadFile
}
