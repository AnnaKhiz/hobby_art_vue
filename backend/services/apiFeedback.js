const { Feedback, ObjectId, User } = require('../db/index');
async function getFeedbackList(req, res, next) {
	try {
		const result = await Feedback.find().populate('user');
		res.send({result: true, data: result})
	} catch (error) {
		console.log('Error in getting feedbacks', error);
		res.status(404).send({result: false, data: []});
	}
}
async function addNewFeedback(req, res, next) {
	const { body: feedback } = req;
	let result = null;

	try {
		const newFeedback = await new Feedback({
			...feedback,
			date: new Date().toLocaleString()
		});
		result = await newFeedback.save();

		if (feedback.user) {
			const user = await User.findOne({_id: feedback.user._id});
			if (!user) return;

			result = await Feedback.findOneAndUpdate({_id: new ObjectId(result._id)}, {$push: { "users": user}}, { new: true, runValidators: true});
		}

		res.status(200).send({result: true, data: result})
	} catch (error) {
		console.log('Error adding feedback', error);
		res.status(409).send({result: false, data: {}})
	}
}
async function getFeedbackById(req, res, next) {
  const { id } = req.params;

	try {
		const result = await Feedback.findOne({ _id: new ObjectId(id)}).populate('user');

		if (!result) {
			return res.send({result: true, data: []});
		}

		res.send({result: true, data: result})
	} catch (error) {
		console.log('Error getting feedback by ID', error);
		res.status(404).send({result: false, data: []})
	}
}
async function getFeedbackByUserId(req, res, next) {
	const { id } = req.params;

	try {
		const result = await Feedback.find({ user: { _id: new ObjectId(id)}}).populate('user');

		if (!result) {
			return res.send({result: true, data: []});
		}

		res.send({result: true, data: result})
	} catch (error) {
		console.log('Error getting feedback by ID', error);
		res.status(404).send({result: false, data: []})
	}
}


module.exports = {
	getFeedbackList,
	addNewFeedback,
	getFeedbackById,
	getFeedbackByUserId
}
