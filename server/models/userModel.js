import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {type:String, require:true},
    password: {type:String, require:true},
    userName:{type:String, require:true},
    deliveryAddress:{type:String, require:true},
    role: {type: String, default: 'user'},
})

const userModel = mongoose.model('User details', userSchema)
export {userModel}