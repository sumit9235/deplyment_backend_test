const express=require("express")
require('dotenv').config()
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(authenticate)
app.use('/notes',noteRouter)

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log(err.message)
    }
    console.log("server is running on 4500")
})