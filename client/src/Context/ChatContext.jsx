import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client"


export const ChatContext = createContext()
export const ChatContextProvider = ({ children, user }) => {

    const [userChats, setUserChats] = useState([])
    const [isUserChatsLoading, setUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)
    const [potentialChats, setPotentialChats] = useState(null)
    const [currentChat, setCurrentChats] = useState(null)
    const [messages, setMessage] = useState(null)
    const [isMessageLoading, setIsMessageLoading] = useState(false)
    const [messageError, setMessageError] = useState(null)
    const [sendTextMessageError, setsendTextMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)
    // initial socket

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket)

        return (() => {
            newSocket.disconnect()
        })
    }, [user])
    //   triger event to add new user
    useEffect(() => {

        if (socket === null) return;
        socket.emit("addNewUser", user?._id)
        socket.on("getOnlineUser", (res) => {
            setOnlineUsers(res)
        })
    }, [socket])

    // send message
    useEffect(() => {

        if (socket === null) return;
        const reciptientId = currentChat?.members?.find((id) => id !== user?._id)

        socket.emit("sendMessage", { ...newMessage, reciptientId })

    }, [newMessage])

  
    // recived message
    useEffect(() => {

        if (socket === null) return;

        socket.on("getMessage", res => {

            if (currentChat?._id !== res.chatId) return;
            setMessage((prev) => [...prev, res])

        })
        return () => {
            socket.off("getMessage")
        }
    }, [socket, currentChat])




    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);

            if (response.error) {
                console.log("there is something  error");
            }

            const pCharts = response?.filter((u) => {
                let isChartCreated = false;

                if (user?._id === u?._id) return false;
                if (userChats) {
                    isChartCreated = userChats?.some((chat) => {
                        return chat?.members[0] === u?._id || chat?.members[1] === u?._id;
                    });
                }
                return !isChartCreated;
            });
            setPotentialChats(pCharts);
        };
        getUsers();
    }, [userChats]);





    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setUserChatsLoading(true)
                setUserChatsError(null)

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)

                setUserChatsLoading(false)
                if (response.error) {

                    setUserChatsError(response)
                }

                setUserChats(response)
            }
        }
        getUserChats()
    }, [user])





    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats`,
            JSON.stringify({
                firstId,
                secondId,
            }))

        if (response.error) {
            return console.log("Error fetching user", response)
        }
        setUserChats((prev) => [...prev, response])

    }, [])




    useEffect(() => {
        const getMessage = async () => {

            setIsMessageLoading(true);
            setMessageError(null);

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

            setIsMessageLoading(false);

            if (response.error) {
                setMessageError(response);
            }
            setMessage(response);


        };

        getMessage();
    }, [currentChat]);


    const sendTextMessage = useCallback(
        async (textMessage, sender, currentChatId, setTextMessage) => {
            if (!textMessage) return console.log("Please input something....");
            const response = await postRequest(
                `${baseUrl}/messages`,
                JSON.stringify({
                    chartId: currentChatId,
                    senderId: sender,
                    text: textMessage,
                })
            );
            if (response.error) return setsendTextMessageError(response);
            setNewMessage(response);
            setMessage((prev) => [...prev, response]);
            setTextMessage("");
        },
        []
    );

    const updateChat = useCallback(async (chat) => {
        console.log(chat, "updateChat")
        setCurrentChats(chat);
    }, []);


    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateChat,
        messages,
        messageError,
        isMessageLoading,
        currentChat,
        sendTextMessage,
        onlineUsers,
        newMessage
    }}>
        {children}
    </ChatContext.Provider>

}