import Message from "../Models/Messagemodel.js";
import Userconnect from "../Models/Connectusermodel.js";

export const AddtwoUser=async(req,res)=>{
    
    let {senderId,receiverId}=req.body
    try{
        const ConnectUser=await new Userconnect({
            members:[senderId,receiverId]
        })
        await ConnectUser.save()
        res.status(201).json({ message: 'User Added',data:ConnectUser})
    }catch(err){
        res.status(400).json({ message: 'Something wrong'})
        console.log(err)
    }
}

export const UpdateUserLastMessage = async (req, res) => {
    const { _id} = req.params;
    try {
   const result = await Userconnect.findOne({_id:_id})
     result.UpdateLastMessage=new Date()
     await  result.save()
     res.status(200).send({message:"update"})

    //   if (result.modifiedCount > 0) {
    //     res.send({ message: "Update successful" });
    //   } else {
    //     res.status(404).send({ message: "User not found" });
    //   }
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };

export const sendmessage=async(req,res)=>{
    let{messageId,sender,messagetext}=req.body
    try{
        const addMessage=new Message({
            messageId,sender,messagetext
        })
        await addMessage.save()
        res.status(201).json({ message: 'message send successfully'})
    }catch(err){
        res.status(400).json({ message: 'Something wrong'})
        console.log(err)
    }
   
}

export const receivMessage=async(req,res)=>{
    let{messageId}=req.params
    try{
        const allMessage=await Message.find({messageId:messageId})
        res.status(201).json({ message:allMessage })
    }catch(err){
        res.status(400).json({ message: 'Something wrong'})   
        console.log(err)
    }
}
export const AddMessage=async(req,res)=>{
    let {senderId,receiverId}=req.body
    try{
        const ConnectUser=await new Userconnect({
            members:[{senderId:senderId,receiverId:receiverId}]
        })
        await ConnectUser.save()
        res.status(201).json({ message: 'Message send successfully'})
    }catch(err){
        res.status(400).json({ message: 'Something wrong'})
        console.log(err)
    }
   

}

export const FinduserFriend=async(req,res)=>{
    try{
        const{userid}=req.params
        let finduser=await Userconnect.find({members:userid}).sort({ UpdateLastMessage: -1 })
        res.status(200).send({data:finduser})

    }catch(err){
        console.log(err)
    }
    

}