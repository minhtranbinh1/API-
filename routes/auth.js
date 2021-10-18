const express = require('express');
const router = express.Router()
const userModel = require('../models/User')
const argon2 = require('argon2')
const userController = require('../../../../NodejsProject/Booking/app/controller/userController')
const jwt = require('jsonwebtoken')
router.use(express.json())
router.use(express.urlencoded());


router.post('/auth/register',async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res
        .status(400)
        .json({success:false,message:"Missing username/Password"})
    }
    try {
        const user = await userModel.findOne({username: username})
        if(user){
            return res.status(400).json({success:false,message:"Username is already in use"})
        } else{
            const hasdPassword = await argon2.hash(password)
        
            const newUser = new userModel({
                username: username,
                password: hasdPassword,
            })
            console.log(newUser)
            await newUser.save()
            //return token
            const accessToken = jwt.sign({userId: newUser._id},process.env.ACCESS_TOKEN_SECRET)
            console.log(accessToken)
            return res.status(200).json({success:true,message:"Account is created",accessToken:accessToken})
        }

    } catch (error) {
        res.json(error);
    }
})
router.post('/auth/login', async (req, res) => {
    const{username,password} = req.body
    //simple validation
    if(!username || !password)
    return res
        .status(400)
        .json({success:false,message:"Missing username or password"})
    try {
        // check existing user
        const user = await userModel.findOne({username})
        if(!user) return res.status(400).json({success:false,message:"Incorrect username or password"})
        //username found
        const passwordValid = await argon2.verify(user.password,password)
        if(!passwordValid) return res.status(400).json({success:false,message:"Incorrect username or password"})
        //all good
        const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).json({success:true,message:"User login success!!",accessToken:accessToken})
    } catch (error) {
        console.log(error)
    }
})
router.get('/auth',
    (req, res) => {
        res.send('User Router')
    }
)
module.exports = router