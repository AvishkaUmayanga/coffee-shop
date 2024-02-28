import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    totalPrice:{ type:Number, require:true },
    numberOfCoffee:{ type:Number, require:true },
    coffeeId: { type:String, require:true },
    userId: { type:String, require:true }
})

const orderModel = mongoose.model('order details', orderSchema)
export {orderModel}