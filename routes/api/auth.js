const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


const router = express.Router();

//User model
const USer = require('../../models/User');

//@ route post api/auth
//Desc: Auth new user
router.post('/', (req,res) =>{
const {email, password} = req.body;

//Validation
if (!email || !password) {
  return res.status(400).json({msg:'Please enter all field'});
}
//Check existing user 
USer.findOne({email})
.then(user =>{
    if(!user) return res.status(400).json({msg:'User does not exist'});

//Validate password
bcrypt.compare(password, user.password)
       .then(isMatch =>{
           if(!isMatch) return res.status(400).json({msg:'Password does not match'});
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
       })
    })
});

//@ route get api/auth/user
//Desc: get user data
//access:private

router.get('/user' ,auth,(req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})




   

module.exports = router;