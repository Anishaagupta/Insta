const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../keys");
const requireLogin = require('../middleware/requireLogin');

router.get('/', (req,res)=>{
    res.send("Hello Ji!");
})



router.post('/signup',(req,res)=>{
    console.log(req.body);
    const {name,email,password,pic} = req.body;
    if(!email || !name || !password){
        return res.status(422).json({error: "Please fill all the details."})
    }
    User.findOne({email:email})
        .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with this emailId."})
        }
        bcrypt.hash(password,12).then(hashedPassword=>{
            const user = new User({
                email,name,password:hashedPassword,pic:pic
            })
            user.save()
            .then(user=>{
                res.json({message:"You are successfully signed up."})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error: "Please Provide Email or Password."})
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: "Invalid Email Or Password."})
        }
        bcrypt.compare(password, savedUser.password).then(doMatch=>{
            if(doMatch){
                 // res.json({message:"You are successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email,followers,following,pic} = savedUser
               res.json({token,user:{_id,name,email,followers,following,pic}})

            }else{
                return res.status(422).json({error: "Invalid Email Or Password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})

module.exports = router