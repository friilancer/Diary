const express = require('express');
const Router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../Models/users');

//Get diary notes
//@access Private
Router.get('/', auth, (req, res) => {
	//get user from auth
	const user = req.user;

	//find User by Id
	User.findById(user.id)
	//Then return only secrets subdocument, exclude main document id
        .select('secrets -_id')
        .then(secrets => {
        	return res.json(secrets);
    })
});

//Add a note to diary
//@access Private
Router.post('/', auth, (req, res) => {
	//get User from auth
	const user = req.user;

	//Get user by id
	User.findById(user.id)
		.then(user => {
			//create a new secret sub document
			const newSecret = user.secrets.create({
				title : req.body.title,
				note : req.body.note
			});

			//Push new secret to database
			user.secrets.push(newSecret)

			//Save document and return new subdocument
			user.save()
				.then(() => res.json(newSecret));

		});
});

//Delete a note from the diary
//@access Private
Router.delete('/:id', auth, (req, res) => {
	//Retrieve ID
	const id = req.params.id;

	//get User from auth
	const user = req.user;

	//Find User by Id
	User.findById(user.id)
		.then(user => {
			//Find secret by id and delete
			user.secrets.id(id).remove()
			user.save()
				.then(() => res.json({success : true}))
				.catch(() => res.status(404).json({success : false}));
		})

});

module.exports = Router