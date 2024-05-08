import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/services";


const useFetchRecipientUser = (chat, user) => {

    const [reciptientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null)

    const reciptientId = chat?.members?.find((id) => id !== user?._id)



    useEffect(() => {
        const getUser = async () => {
            if (!reciptientId) return null

            const response = await getRequest(`${baseUrl}/users/find/${reciptientId}`)


            if (response.error) {
                setError(response)
            }
            setRecipientUser(response)
        }
        getUser();

    }, [reciptientId])


    return { reciptientUser }
}

export default useFetchRecipientUser;