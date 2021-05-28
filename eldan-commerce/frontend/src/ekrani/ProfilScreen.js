import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../komponente/Message'
import Loader from '../komponente/Loader'
import { getKorisnikDetalji, azurirajKorisnickiProfil } from '../actions/korisnikAction'
import { prikaziMojeNarudzbe } from '../actions/narudzbaAction'

const ProfilScreen = ({ history }) => {
    const [ime, setIme] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [potvrdiPassword, setPotvrdiPassword] = useState('')
    const [poruka, setPoruka] = useState(null)

    const dispatch = useDispatch()

    const korisnikDetalji = useSelector(state => state.korisnikDetalji)
    const { loading, error, korisnik } = korisnikDetalji

    const korisnikLogin = useSelector(state => state.korisnikLogin)
    const { korisnikInfo } = korisnikLogin

    const korisnikAzurirajProfil = useSelector(state => state.korisnikAzurirajProfil)
    const { uspjesno } = korisnikAzurirajProfil

    const listaNarudzbi = useSelector(state => state.listaNarudzbi)
    const { loading: loadingNarudzbe, error: errorNarudzbe, narudzbe } = listaNarudzbi

    useEffect(() => {
        if (!korisnikInfo) {
            history.push('/login')
        } else {
            if (!korisnik.ime) {
                dispatch(getKorisnikDetalji('profil'))
                dispatch(prikaziMojeNarudzbe())
            } else {
                setIme(korisnik.ime)
                setEmail(korisnik.email)
            }
        }
    }, [dispatch, history, korisnikInfo, korisnik])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== potvrdiPassword) {
            setPoruka('Passwordi se ne podudaraju')
        } else {
            dispatch(azurirajKorisnickiProfil({ id: korisnik._id, ime, email, password }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>Korisnički profil</h2>
                {poruka && <Message variant='danger'>{poruka}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {uspjesno && <Message variant='success'>Profil azuriran</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='ime'>
                        <Form.Label>Ime</Form.Label>
                        <Form.Control type='text' placeholder='Unesite ime' value={ime} onChange={(e) => setIme(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Adresa</Form.Label>
                        <Form.Control type='email' placeholder='Unesite e-mail' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Unesite password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='potvrdiPassword'>
                        <Form.Label>Potvrdi Password</Form.Label>
                        <Form.Control type='password' placeholder='Potvrdite password' value={potvrdiPassword} onChange={(e) => setPotvrdiPassword(e.target.value)}></Form.Control>
                    </Form.Group>


                    <Button type='submit' variant='primary'>Ažuriraj profil</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>Moje narudžbe</h2>
                {loadingNarudzbe ? <Loader /> : errorNarudzbe ? <Message variant='danger'>{errorNarudzbe}</Message> : (
                    <Table striped border hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATUM</th>
                                <th>UKUPNO</th>
                                <th>PLAĆENO</th>
                                <th>DOSTAVLJENO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {narudzbe.map(narudzba => (
                                <tr key={narudzba._id}>
                                    <td>{narudzba._id}</td>
                                    <td>{narudzba.cijenaPoreza}</td>
                                    <td>{narudzba.cijenaUkupno}</td>
                                    <td>{narudzba.jePlaceno ? narudzba.datumPlacanja.substring(0, 10) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td>{narudzba.jeDostavljeno ? narudzba.datumDostavljanja.substring(0, 10) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/narudzba/${narudzba._id}`}>
                                            <Button variant='light'>Detalji</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )

}
export default ProfilScreen