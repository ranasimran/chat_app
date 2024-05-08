const { default: mongoose } = require("mongoose")
const massageModal = require("../Models/messageModel")

const createMessage = async (req, res) => {

    const { chatId, senderId, text } = req.body

    const message = new massageModal({ chatId, senderId, text })
    try {

        const response = await message.save()
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}


const getMessage = async (req, res) => {
    const { chatId } = req.params

    try {
        // const message = await massageModal.find({ _id: new mongoose.Types.ObjectId(chatId) })
        const message = await massageModal.find({ chatId })
        res.status(200).json(message)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
module.exports = { createMessage, getMessage }