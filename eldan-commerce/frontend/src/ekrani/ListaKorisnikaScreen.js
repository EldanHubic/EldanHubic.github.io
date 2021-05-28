import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../komponente/Message'
import Loader from '../komponente/Loader'
import { listKorisnici, delKorisnik } from '../actions/korisnikAction'

function ListaKorisnikaScreen({ history }) {
    const dispatch = useDispatch()

    const listaKorisnika = useSelector(state => state.listaKorisnika)
    const { loading, error, korisnici } = listaKorisnika

    const korisnikLogin = useSelector(state => state.korisnikLogin)
    const { korisnikInfo } = korisnikLogin

    const korisnikDelete = useSelector(state => state.korisnikDelete)
    const { success: successDelete } = korisnikDelete

    useEffect(() => {
        if (korisnikInfo && korisnikInfo.jeAdmin) {
            dispatch(listKorisnici())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, korisnikInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Jeste li sigurni ?')) {
            dispatch(delKorisnik(id))
        }
    }

    return (
        <>
            <h1>Korisnici</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>IME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {korisnici.map(korisnik => (
                            <tr key={korisnik._id}>
                                <td>{korisnik._id}</td>
                                <td>{korisnik.ime}</td>
                                <td><a href={`mailto:${korisnik.email}`}>{korisnik.email}</a></td>
                                <td>
                                    {korisnik.jeAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/korisnik/${korisnik._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(korisnik._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ListaKorisnikaScreen
