const express = require('express');
const Router =  express.Router();
const bcrypt = require('bcryptjs');
const {jwtSecret} = require('../../config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../Models/users');


//Login User
Router.post('/', (req, res) => {
    const { email, password} = req.body;

    //Validate
    if(!email || !password){
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    //Check for User
    User.findOne({ email }).then(user =>{
        if(!user) return res.status(400).json({ msg: 'User does not exists'});

        //Validate Password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg : 'Invalid credentials'});

                jwt.sign(
                    {id : user.id},
                    jwtSecret,
                    {expiresIn: 36000},
                    (err, token) => {
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                name:user.name,
                                email:user.email
                            }
                        })
                    }
                )
            })
    })
    

});

//get User via token
Router.get('/user', auth, (req, res) => {
    const user = req.user;

    User.findById(user.id)
        .select('-password')
        .then(user => res.json(user));
})
module.exports = Router;
