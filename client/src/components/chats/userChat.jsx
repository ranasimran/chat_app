
import { useContext } from "react";
import useFetchRecipientUser from "../../Hooks/useFetch"
import profile from "../../assets/profile.svg"
import { Container, Stack } from 'react-bootstrap'
import { ChatContext } from "../../Context/ChatContext";



export const UserChat = ({ chat, user }) => {

    const { reciptientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers } = useContext(ChatContext)

    const isOnline = onlineUsers?.some((user) => user?.userId === reciptientUser?._id)

    return (
        <>

            <Container>

                <Stack direction='horizontal' gap={3} className='user-card align-items-center p-2 justify-content-between' role='button'>
                    <div className='d-flex'>
                        <div className='me-2'>
                            <img src={profile} alt='profile' height="35px" />
                        </div>
                        <div className='text-center'>
                            <div className='name'>{reciptientUser?.name}</div>
                            <div className='text'>Text message</div>

                        </div>
                    </div>

                    <div className='d-flex flex-column align-items-end'>
                        <div className='date'>
                            8/4/2024
                        </div>
                        <div className='this-user-notifications'>2</div>
                        <span className={isOnline ? 'user-online' : ""}></span>
                    </div>
                </Stack>
            </Container>

        </>
    )
}
