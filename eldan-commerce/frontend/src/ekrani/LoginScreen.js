import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../komponente/Message'
import Loader from '../komponente/Loader'
import FormContainer from '../komponente/FormContainer'
import { login } from '../actions/korisnikAction'


const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const korisnikLogin = useSelector(state => state.korisnikLogin)
    const { loading, error, korisnikInfo } = korisnikLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (korisnikInfo) {
            history.push(redirect)
        }
    }, [history, korisnikInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        //DISPATCH LOGIN
    }

    return (
        <FormContainer>
            <h1>PRIJAVI SE</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Adresa</Form.Label>
                    <Form.Control type='email' placeholder='Unesite e-mail' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Unesite password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>Prijavi se</Button>
                <Row className='py-3'>
                    <Col>
                        Novi kupac? <Link to={redirect ? `/registracija?redirect=${redirect}` : '/register'}>Registriraj se</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )

}
export default LoginScreen
