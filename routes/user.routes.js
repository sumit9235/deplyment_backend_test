const express=require('express')
const userRouter=express.Router()
const {UserModel}=require("../model/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


userRouter.post("/register",async (req,res)=>{
    const {name,email,password}=req.body
    try{
        bcrypt.hash(password,4,async(err,hash)=>{
            if(err){
                res.send(err.message)
            }else{
                const user=new UserModel({name,email,password:hash})
                await user.save()
                res.send({"msg":"New user has been register"})
            }
        });
       
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=(req.body)
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"User logged in","token":token})
                }else{
                    res.send({"msg":"Wrong credentials"})
                }
            })
           
        }else{
            res.send({"msg":"Wrong credentials"})
        }
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
    
})

module.exports={userRouter}