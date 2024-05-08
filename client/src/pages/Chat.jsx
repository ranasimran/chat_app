import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { Container, Stack } from 'react-bootstrap'
import { AuthContext } from '../Context/AuthContext'
import PotentialChat from '../components/chats/PotentialChat'
import { UserChat } from '../components/chats/userChat'
import Chatbox from '../components/chats/ChatBox'



export default function Chat() {

    const { user } = useContext(AuthContext)
    const { userChats, isUserChatsLoading, userChatsError, updateChat, currentChat } = useContext(ChatContext)



    return (<>
        <Container>
            <PotentialChat />
            {userChats && userChats?.length < 1 ? null : <>

                <Stack direction="horizontal" gap={4} className='align-items-start'>
                    <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
                        {isUserChatsLoading && <p>Loading the Charts </p>}
                        {userChats && userChats.map((chat, index) => {
                            return (
                                <div key={index} onClick={() => updateChat(chat)}>
                                    <UserChat chat={chat} user={user} />
                                </div>
                            );
                        })}
                    </Stack>
                    <Chatbox />

                </Stack>
            </>
            }
        </Container>
    </>

    )
}
