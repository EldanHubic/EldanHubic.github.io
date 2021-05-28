import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../komponente/Message'
import Loader from '../komponente/Loader'
import FormContainer from '../komponente/FormContainer'
import { azurirajKorisnika } from '../actions/korisnikAction'
import { KORISNIK_AZURIRAJ_RESET } from '../konstante/korisniciKonstante'

const KorisnikEditScreen = ({ match, history }) => {
    const korisnikId = match.params.id
    const [ime, setIme] = useState('')
    const [email, setEmail] = useState('')
    const [jeAdmin, setJeAdmin] = useState(false)

    const dispatch = useDispatch()

    const korisnikDetalji = useSelector(state => state.korisnikDetalji)
    const { loading, error, korisnik } = korisnikDetalji

    const korisnikAzuriraj = useSelector(state => state.korisnikAzuriraj)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = korisnikAzuriraj

    //const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (successUpdate) {
            dispatch({ KORISNIK_AZURIRAJ_RESET })
            history.push('/admin/listakorisnika')
        } else {
            // if (!korisnik.ime || korisnik._id !== korisnikId) {
            //     dispatch(getKorisnikDetalji(korisnikId))
            // } else {
            //     setIme(korisnik.ime)
            //     setEmail(korisnik.email)
            //     setJeAdmin(korisnik.jeAdmin)
            // }
        }
    }, [dispatch, korisnikId, korisnik, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(azurirajKorisnika({ _id: korisnikId, ime, email, jeAdmin }))
    }

    return (
        <>
            <Link to='/admin/listakorisnika' className='btn btn-light my-3'>Nazad</Link>
            <FormContainer>
                <h1>Ažuriraj korisnika</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='ime'>
                            <Form.Label>Ime</Form.Label>
                            <Form.Control type='text' placeholder='Unesite ime' value={ime} onChange={(e) => setIme(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Adresa</Form.Label>
                            <Form.Control type='email' placeholder='Unesite e-mail' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='jeAdmin'>

                            <Form.Check type='checkbox' label='Je Admin' checked={jeAdmin} onChange={(e) => setJeAdmin(e.target.checked)}></Form.Check>
                        </Form.Group>



                        <Button type='submit' variant='primary'>Ažuriraj</Button>
                    </Form>
                )}

            </FormContainer>
        </>

    )

}
export default KorisnikEditScreen