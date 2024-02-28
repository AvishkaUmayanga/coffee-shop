import mongoose from "mongoose";

const coffeeSchema = mongoose.Schema({
    coffeeCategory: {type:String, require:true},
    coffeeName:{type:String, require:true},
    coffeePrice: {type:Number, require:true},
    deliveryFee: {type:Number, require:true},
    coffeeDescription: {type:String, require:true},
    coffeeRating: {type:Number, require:true},
    numOfRating: {type:Number, require:true},
    coffeeImage: {type:String, require:true}
})

const CoffeeModel = mongoose.model('Coffee Details', coffeeSchema)
export {CoffeeModel}
    
    