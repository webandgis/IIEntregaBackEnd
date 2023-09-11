const mongoose=require('mongoose')
const userColecction="users"

const userShema=new mongoose.Schema({
    first_name:{type:String,required:true,max:10},
    last_name:{type:String,required:true,max:10},
    email:{type:String,required:true,max:20},
    phone:{type:Number,required:false},
    address:{type:String,required:true,max:50}
})

const userModel=mongoose.model(userColecction,userShema)
module.exports={userModel}