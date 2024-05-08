// const { Server } = require("socket.io");

// const io = new Server({ cors: "http://localhost:5173" });
// // make connect
// io.on("connection", (socket) => {
//     console.log("new connection", socket.id)

//     // listen to connection
//     var onlineUsers = [];
//     socket.on("addNewUser", (userId) => {
//         !onlineUsers.some(user => user?.userId === userId) &&
//             onlineUsers.push({
//                 userId,
//                 socketId: socket?.id
//             })
//         console.log(onlineUsers, "onlinUsers")
//     })

// });


// io.listen(3000);