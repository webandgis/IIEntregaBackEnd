const {Router}=require('express')
const {userModel}=require('../models/user.model.js')
const router=Router()

router.get("/", async (req,res)=>{
    try{
        let users= await userModel.find()
        res.send({result:"success",payload:users})
    }catch(error){
console.log("error en el usuario ingresado")
    }
})

router.post("/",async(req,res)=>{
    let {first_name,last_name,email,phone,address}=req.body
    if(!first_name || !last_name || !email||!phone||!address){
        res.send({status:"error",error:"faltan parametros"})

      
    }
    let result= await userModel.create({first_name,last_name,email,phone,address})
    res.send({result:"success",payload:result})
})

router.put("/:uid",async(req,res)=>{
    let {uid}=req.params

    let userToReplace=req.body
    if(!userToReplace.first_name||!userToReplace.last_name||!userToReplace.email||!userToReplace.phone||!userToReplace.address){
        res.send({result:"error",error:"faltan parametros"})
    }

    let result= await userModel.updateOne({_id:uid},userToReplace)
    res.send({result:"success",payload:result})

})

router.delete("/:uid",async(req,res)=>{
    let {uid}=req.params
    let result=await userModel.deleteOne({_id:uid})
    res.send({result:"success",payload:result})
})
module.exports=router
