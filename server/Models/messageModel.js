const mongoose = require("mongoose");

const massageSchema = new mongoose.Schema(
    {
        chatId: String,
        senderId: String,
        text: String
    },
    {
        timestamps: true
    }
)

const massageModal = mongoose.model("Message", massageSchema);
module.exports = massageModal;