import mongoose from "mongoose";
const Schema = mongoose.Schema

const messageSchema = new Schema({
  messageId:{
    type:String
  },
  sender:{
    type:String
  },
 messagetext:{
    type:String
 }
     
}, {
    timestamps:true
  });

const Message = mongoose.model('Message', messageSchema);
export default Message