import express from 'express'
const router = express.Router()
import {CoffeeModel} from '../models/coffeeModel.js'
import { authToken, isAdmin } from './middleware/auth.js';
import { orderModel } from '../models/orderModel.js';
import { userModel } from '../models/userModel.js';

//create
router.post('/add_coffee',authToken, isAdmin, async (req, res) => {
    try {
        const {formData} = req.body
        const {coffeeName} = formData
        const existingCoffee = await CoffeeModel.findOne({coffeeName});
        if(existingCoffee){
            return res.status(400).json({ message: 'Coffee with the same name already exists' });
        }

        const newCoffee = new CoffeeModel(formData)
        await newCoffee.save()
        return res.status(201).json({ message: 'Coffee saved successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

//fetch all coffee
router.get('/all_coffee',authToken, isAdmin, async(req,res)=>{
    try{
        const allCoffee = await CoffeeModel.find({})
        return res.status(200).json({allCoffee:allCoffee})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : 'Server error'})
    }
})


//Delete
router.delete('/delete_coffee:id',authToken, isAdmin, async(req, res)=>{
    try{
        const {id} = req.params
        await CoffeeModel.findByIdAndDelete(id)
        return res.status(200).json({message:'Deleted successfully'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
})


//
router.get('/get_coffee/:id',authToken, isAdmin, async(req, res)=>{
    try{
        const {id} = req.params
        const cDetails = await CoffeeModel.findById(id)
        return res.status(200).json({coffeeDetails:cDetails})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
})

//update
router.put('/update_coffee/:id',authToken, isAdmin, async(req, res)=>{
    try{
        const {formData} = req.body
        const {id} = req.params
        await CoffeeModel.findByIdAndUpdate(id ,formData)
        return res.status(200).json({message:'Updated successfully'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }   
})

//fetch all orders
router.get('/all_orders',authToken, isAdmin, async(req, res) => {
    try{
        const allOrders = await orderModel.find({})
        const allDetails = []

        for(const data of allOrders){
            const coffeeDetails = await CoffeeModel.findById(data.coffeeId)
            const userDetails = await userModel.findById(data.userId)

            const orderDetails = {
                coffeeDetails: {
                    coffeeName:coffeeDetails.coffeeName,
                    coffeeCategory:coffeeDetails.coffeeCategory,
                    coffeeImage:coffeeDetails.coffeeImage
                },
                userDetails:{
                    userName:userDetails.userName,
                    deliveryAddress:userDetails.deliveryAddress
                },
                numberOfCoffee: data.numberOfCoffee,
                totalPrice: data.totalPrice
            }
            allDetails.push(orderDetails)
        }
        return res.status(200).json({allDetails})
    }
    catch(err){
        console.log(err)
    }
})

export {router}
