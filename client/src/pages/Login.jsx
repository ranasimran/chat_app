import React, { useContext } from 'react'
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { AuthContext } from '../Context/AuthContext'

export default function Login() {

    const { logoutUser, loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } = useContext(AuthContext)
    return (
        <>
            <Form onSubmit={loginUser}>
                <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
                    <Col xs={6}><Stack gap={3}>
                        <h2>Login</h2>

                        <Form.Control type='email' placeholder='Email' onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })} />

                        <Form.Control type='password' placeholder='Password' onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} />
                        {/* <Button variant='primary' type='submit'>Login</Button> */}
                        {/* <Alert variant='danger'><p>An error occured</p> </Alert> */}
                        <Button variant='primary' type='submit'>{isLoginLoading ? "Getting you in..." : "Login"}</Button>

                        {loginError?.error && <Alert variant='danger'><p>{loginError?.message}</p> </Alert>}
                    </Stack></Col></Row>
            </Form>
        </>
    )
}
