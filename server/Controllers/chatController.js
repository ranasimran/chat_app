const chatModel = require("../Models/chatModel")
const mongoose = require("mongoose")


const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }

        });

        if (chat) return res.status(200).json(chat)

        const newchart = new chatModel({
            members: [firstId, secondId]
        })


        const response = await newchart.save()
        res.status(200).json(response)

    } catch (error) {

        res.status(500).json(error)

    }
}



const findUsersChats = async (req, res) => {
    const chatId = req.params.chatId
   
    try {
        const chats = await chatModel.find({
            members: { $in: [chatId] }
        })
        res.status(200).json(chats)

    }
    catch (error) {

        res.status(500).json(error)
    }
}

const findChats = async (req, res) => {

    const { firstId, secondId } = req.params
    try {

        const chat = await chatModel.find({
            members: { $all: [firstId, secondId] }

        })
        res.status(200).json(chat)

    } catch (error) {
        console.log(error, "error");
        res.status(500).json(error)

    }
};

module.exports = { createChat, findUsersChats, findChats }