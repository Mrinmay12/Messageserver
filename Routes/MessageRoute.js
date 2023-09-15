import express from "express";
const router=express.Router()
import { AddMessage,AddtwoUser,sendmessage ,receivMessage,FinduserFriend,UpdateUserLastMessage} from "../Controllers/MessageController.js";

router.post('/useradd',AddtwoUser)
router.post('/sendmessage',sendmessage)
router.get('/recivemessage/:messageId',receivMessage)
router.get('/userfriend/:userid',FinduserFriend)
router.put('/updatelastmessage/:_id',UpdateUserLastMessage)

export default router