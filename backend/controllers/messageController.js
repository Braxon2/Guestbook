const Joi = require("joi");
const MessageModel = require("../model/Message");

const messageSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.min": "Name must be at least 2 characters long.",
    "string.max": "Name cannot exceed 100 characters.",
    "any.required": "Name is required.",
  }),
  message: Joi.string().trim().min(2).max(500).required().messages({
    "string.min": "Message must be at least 5 characters long.",
    "string.max": "Message cannot exceed 500 characters.",
    "any.required": "Message is required.",
  }),
});

async function postMessage(req, res, next) {
  try {
    const { error, value } = messageSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    const { name, message } = value;

    const newMessage = await MessageModel.createMessage(name, message);

    res.status(201).json({
      status: "success",
      message: "Message posted successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error in postMessage controller:", error);
    next(error);
  }
}

async function getMessages(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    if (limit > 50) {
      limit = 50;
    } else if (limit < 1) {
      limit = 1;
    }

    const offset = (page - 1) * limit;

    const [messages, totalMessages] = await Promise.all([
      MessageModel.getMessages(limit, offset),
      MessageModel.getTotalMessageCount(),
    ]);

    const totalPages = Math.ceil(totalMessages / limit);

    res.status(200).json({
      status: "success",
      messages: messages,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalPages: totalPages,
        totalMessages: totalMessages,
      },
    });
  } catch (error) {
    console.error("Error in getMessages controller:", error);
    next(error);
  }
}

module.exports = { postMessage, getMessages };
