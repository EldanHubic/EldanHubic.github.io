import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../komponente/Message'
import Loader from '../komponente/Loader'
import FormContainer from '../komponente/FormContainer'
import { registriraj } from '../actions/korisnikAction'


const RegistracijaScreen = ({ location, history }) => {
    const [ime, setIme] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [potvrdiPassword, setPotvrdiPassword] = useState('')
    const [poruka, setPoruka] = useState(null)

    const dispatch = useDispatch()

    const korisnikRegistracija = useSelector(state => state.korisnikRegistriraj)
    const { loading, error, korisnikInfo } = korisnikRegistracija

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (korisnikInfo) {
            history.push(redirect)
        }
    }, [history, korisnikInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== potvrdiPassword) {
            setPoruka('Passwordi se ne podudaraju')
        } else {
            dispatch(registriraj(ime, email, password))
            //DISPATCH REGISTRACIJA
        }
    }

    return (
        <FormContainer>
            <h1>REGISTRIRAJ SE</h1>
            {poruka && <Message variant='danger'>{poruka}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='ime'>
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type='text' placeholder='Unesite ime' value={ime} onChange={(e) => setIme(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Adresa</Form.Label>
                    <Form.Control type='email' placeholder='Unesite e-mail' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Unesite password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='potvrdiPassword'>
                    <Form.Label>Potvrdi Password</Form.Label>
                    <Form.Control type='password' placeholder='Potvrdite password' value={potvrdiPassword} onChange={(e) => setPotvrdiPassword(e.target.value)}></Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>Registracija</Button>
                <Row className='py-3'>
                    <Col>
                        Imate account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Prijavite se</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )

}
export default RegistracijaScreen