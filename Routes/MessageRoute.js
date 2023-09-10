import express from "express";
const router=express.Router()
import { AddMessage,AddtwoUser,sendmessage ,receivMessage,FinduserFriend} from "../Controllers/MessageController.js";

router.post('/useradd',AddtwoUser)
router.post('/sendmessage',sendmessage)
router.get('/recivemessage/:messageId',receivMessage)
router.get('/userfriend/:userid',FinduserFriend)

export default router