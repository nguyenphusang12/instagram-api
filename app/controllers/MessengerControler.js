const Messages = require("../models/Messages");
const Conversation = require("../models/Conversation");

class MessengerController {
  // [GET] /api/messenger/conversations/
  //@desc get conversations
  async getConversations(req, res) {
    try {
      const conversation = await Conversation.find({
        members: {
          $in: req.params.userId,
        },
      });

      return res.status(200).json({ success: true, conversation });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  // [POST] /api/messenger/conversation/
  //@desc create a conversation
  async createConversation(req, res) {
    const conversation = new Conversation({
      members: [req.body.member1, req.body.member2],
      new: req.body.new,
    });
    try {
      await conversation.save();
      return res.status(200).json({ success: true, conversation });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  }
  //[POST] /api/messenger/messages
  // @desc create a messages
  async createMessages(req, res) {
    const messages = new Messages(req.body);
    try {
      await messages.save();
      res.status(200).json({ success: true, messages });
    } catch (error) {
      res.status(500).json({ error: error, success: false });
    }
  }
  //[GET] /api/messenger/messages/:conversationId
  //@desc get messages
  async getMessages(req, res) {
    try {
      const messages = await Messages.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json({ messages, success: true });
    } catch (error) {
      res.status(500).json({ error: error, success: false });
    }
  }
  //[POST] /api/messenger/addnew

  async addNew(req, res) {
    const conversationId = req.body.conversationId;
    const idNew = req.body.idNew;
    console.log(conversationId, idNew);
    try {
      await Conversation.findOneAndUpdate(
        {
          _id: conversationId,
        },
        { new: idNew }
      );
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error, success: false });
    }
  }
  // [DELETE] /api/messenger/removeNew
  async removeNew(req, res) {
    const conversationId = req.params.conversationId;
    try {
      await Conversation.findOneAndUpdate(
        {
          _id: conversationId,
        },
        { new: "" }
      );
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error, success: false });
    }
  }
}

module.exports = new MessengerController();
