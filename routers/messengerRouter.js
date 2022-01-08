const express = require("express");

const router = express.Router();

const messengerController = require("../app/controllers/MessengerControler");
// [GET] /api/messenger/conversations/:userId
router.get("/conversations/:userId", messengerController.getConversations);
// [POST] /api/messenger/conversations
router.post("/conversation", messengerController.createConversation);
// [POST] /api/messenger/messages
router.post("/messages", messengerController.createMessages);
// [POST] /api/messenger/addnew
router.post("/addnew", messengerController.addNew);
// [DELETE] /api/messenger/removeNew
router.delete("/removeNew/:conversationId", messengerController.removeNew);
// [GET] /api/messenger/messages/:conversationId
router.get("/messages/:conversationId", messengerController.getMessages);

module.exports = router;
