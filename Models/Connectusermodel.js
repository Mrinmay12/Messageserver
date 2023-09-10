import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserconnectSchema = new Schema({
 members:{
    type:Array
 }
     
}, {
    timestamps:true
  });

const Userconnect = mongoose.model('Userconnection', UserconnectSchema);
export default Userconnect