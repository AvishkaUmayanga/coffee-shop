import express from 'express'
import { CoffeeModel } from '../models/coffeeModel.js'
import {userModel} from '../models/userModel.js'
import {orderModel} from '../models/orderModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authToken } from './middleware/auth.js'
const router = express.Router()

//fetch all coffee
router.get('/get_coffee', async(req,res)=>{
    try{
        const allCoffee = await CoffeeModel.find({})
        return res.status(200).json({allCoffee})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
})

//fetch one coffee details
router.get('/details/:id', async(req, res)=>{
    try{
        const {id} = req.params
        const coffDetails = await CoffeeModel.findById(id)
        return res.status(200).json({resDetails:coffDetails})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
})

//signup
router.post('/signup', async(req, res)=>{
    try{
        const {formData} = req.body
        const {email, password, userName, deliveryAddress} = formData
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message:'Email already exist'})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser =  userModel({email, userName, deliveryAddress, password:hashedPassword})
        await newUser.save()
	return res.status(201).json({message: 'Signup successfull'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
})

//Login
router.post('/login', async(req, res)=>{
    try{
        const {formData} = req.body
        const {email, password} = formData
        const existingUser = await userModel.findOne({email})
        if(!existingUser){
            return res.status(400).json({message:'Please signup first'})
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password)
        if(!passwordMatch){
            return res.status(401).json({message:'Invalid password'})
        }
        const user = {userId:existingUser._id, role:existingUser.role}
        const token = jwt.sign(user, process.env.TOKEN_KEY , {expiresIn: '1h'})
        return res.status(200).json({message:'Login successfull', token, role:existingUser.role})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
})

//get user details
router.get('/user_details',authToken, async(req, res) => {
    try{
        const userId = req.user.userId
        const {id} = req.params
        const userDetails = await userModel.findById(userId)
        return res.status(200).json({userDetails:{email:userDetails.email, userName:userDetails.userName, deliveryAddress:userDetails.deliveryAddress}})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
})

//save order
router.post('/order_details/:id', authToken, async(req, res)=>{
    try{
        const coffeeId = req.params.id
        const userId = req.user.userId
        const {totalPrice, numberOfCoffee} = req.body
        const newOrder = new orderModel({coffeeId, userId, totalPrice, numberOfCoffee})
        await newOrder.save()
        return res.status(201).json({message:'Done'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
})

export {router}