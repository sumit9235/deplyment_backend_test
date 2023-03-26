const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/notes.model")


noteRouter.get("/",async(req,res)=>{
    const data=await NoteModel.find()
    res.send(data)
    // const querry=req.query;
    // const userId_req=req.body.userId;

    // try {
    //     const post=await NoteModel.find({userId:userId_req, querry});
    //     res.send(post)

    // } catch (error) {
    //     res.send({"msg":error})
    // }
})

noteRouter.post("/create",async(req,res)=>{
    const payload=(req.body)
try{
    const note = new NoteModel(payload)
    await note.save()
    res.send({"msg":"New note has been created"})
}catch(err){
    res.send({"msg":"Bad request"})
}
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
        await NoteModel.findByIdAndDelete({_id:id})
        res.send({"msg":`note with id:${id} has been deleated`})
    }catch(err){
        res.status(500).send({ "msg": "Error deleting note" })
    }
})

noteRouter.patch("/patch/:id",async(req,res)=>{
    const data=req.body
    const id=req.params.id
    try{
        const note=await NoteModel.findByIdAndUpdate({_id:id},data);
        res.send({"msg":`note with id:${id} has been updated`})
    }catch(err){
        res.send({"msg":"Something gone wrong"})
    }
})

module.exports={noteRouter}