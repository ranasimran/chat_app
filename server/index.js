const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")
// const http = require("http");

const app = express()
require("dotenv").config()
// const server = http.createServer(app);
const { Server } = require("socket.io");






const io = new Server({ cors: "http://localhost:5173" });
// socket connection
io.on("connection", (socket) => {
    // console.log("new connection", socket.id)

    // listen to connection
    var onlineUsers = [];
    socket.on("addNewUser", (userId) => {

        !onlineUsers.some((user) => user?.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        // console.log(onlineUsers, "onlinUsers")
        io.emit("getOnlineUser", onlineUsers)
    })


    // add message

    socket.on("sendMessage", (message) => {
        // console.log(message, "message")
        const user = onlineUsers?.find((user) => user.userId === message.reciptientId, "finduser")

        console.log(user, "user")
        if (user) {
            io.to(user.socketId).emit("getMessage", message)
        }
    })




    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
        io.emit("getOnlineUser", onlineUsers)
    })
});


io.listen(3000);


app.use(express.json())

app.use(cors())
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute)
app.use('/api/messages', messageRoute);

app.get("/", (req, res) => {
    res.send("Welcome our chat app APIs...")
})


const port = process.env.PORT || 4000
const uri = process.env.ATLAS_URI
app.listen(port, (req, res) => {
    console.log(`port listenining on port ....: ${port}`)
})
// server.listen(4000, () => "Server is running on port 4000");

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Mongoose connect success"))
    .catch((error) => console.log("Mongoose connection fail", error.message))