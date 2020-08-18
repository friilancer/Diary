const express = require('express');
const Router =  express.Router();
const bcrypt = require('bcryptjs');
const {jwtSecret} = require('../../config');
const jwt = require('jsonwebtoken');
const User = require('../../Models/users');

//register User
Router.post('/', (req, res) => {
    const { name, email, password} = req.body;

    //Validate
    if(!name || !email || !password){
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    //Check for User
    User.findOne({ email }).then(user =>{
        if(user) return res.status(400).json({ msg: 'User already exists'});

        const newUser = new User({
            name,
            email,
            password,
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then( user => {
                    jwt.sign(
                        {id : user.id},
                        jwtSecret,
                        { expiresIn: 3600},
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user : {
                                   id : user.id,
                                   name: user.name,
                                   email: user.email                          
                                }
                            })
                            
                        }                  
                    )
                })
            })            
        })

    })
    

});

module.exports = Router;
