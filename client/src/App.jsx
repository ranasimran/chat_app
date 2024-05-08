import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Chat from "./pages/Chat"
import Register from "./pages/Register"
import Login from "./pages/Login"

import { Container } from "react-bootstrap"

import CollapsibleExample from "./pages/Navbar"
import { useContext } from "react"
import { AuthContext } from "./Context/AuthContext"
import { ChatContextProvider } from "./Context/ChatContext"




function App() {

  const { user } = useContext(AuthContext)
  return (
    <>
      <ChatContextProvider user={user}>
        <CollapsibleExample />
        <Container>

          <Routes>

            <Route path="/chat" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Chat /> : <Register />} />
            <Route path="/login" element={user ? <Chat /> : <Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container></ChatContextProvider>



    </>
  )
}

export default App
