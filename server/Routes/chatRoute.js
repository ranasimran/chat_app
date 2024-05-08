const express = require('express');
const { createChat, findUsersChats, findChats } = require('../Controllers/chatController');

const router = express.Router();


router.post("/", createChat)
router.get("/:chatId", findUsersChats)
router.get("/find/:firstId/:secondId", findChats)

module.exports = router;