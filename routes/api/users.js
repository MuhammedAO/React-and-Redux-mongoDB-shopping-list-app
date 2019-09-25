const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


const router = express.Router();

//User model
const USer = require('../../models/User');

//@ route GET api/users
//Desc: register new user
router.post('/', (req,res) =>{
const {name, email, password} = req.body;

//Validation
if (!name || !email || !password) {
  return res.status(400).json({msg:'Please enter all fields'});
}
//Check existing user 
USer.findOne({email})
.then(user =>{
    if(user) return res.status(400).json({msg:'User already exists'});
    
    const newUSer = new USer({
        name,
        email,
        password
    });

//create salt & Encrypt(hash) password
bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(newUSer.password,salt,(err,hash)=>{
        if (err) throw err;
        newUSer.password = hash;
        newUSer.save()
        .then(user =>{
        jwt.sign(
            {id:user.id},
            config.get('jwtSecret'),
            {expiresIn:3600},
            (err,token) =>{
            if (err) throw err
            res.json({
                token,
                user:{
                id:user.id,
                name: user.name,
                email:user.email
                }
                });
            }   
        )
        
        });
    })
    })
    })


});


   

module.exports = router;