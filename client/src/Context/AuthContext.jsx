import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setRegisterLoading] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setLoginLoading] = useState(false)

    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })



    useEffect(() => {
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    }, [])


    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])



    const registerUser = useCallback(async (e) => {
        e.preventDefault()
        setRegisterLoading(true)
        setRegisterError(null)

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))



        if (response.error) {
            return setRegisterError(response)
        }
        setRegisterLoading(false)
        localStorage.setItem("User", JSON.stringify(response))

        setUser(response)
    }, [registerInfo])


    const loginUser = useCallback(async (e) => {
        e.preventDefault()

        setLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))


        if (response.error) {
            return setLoginError(response)
        }
        setLoginLoading(false)

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)

    }, [loginInfo])

    const logoutUser = useCallback(async () => {
        localStorage.removeItem("User")
        setUser(null)
    }, [])




    return (
        <AuthContext.Provider value={{
            user, registerInfo, registerUser, registerError, updateRegisterInfo, isRegisterLoading, logoutUser, loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}