import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../komponente/Message'
import Loader from '../komponente/Loader'
import { prikaziNarudzbe } from '../actions/narudzbaAction'


function NarudzbeListScreen({ history }) {
    const dispatch = useDispatch()

    const sveNarudzbe = useSelector(state => state.sveNarudzbe)
    const { loading, error, narudzbe } = sveNarudzbe

    const korisnikLogin = useSelector(state => state.korisnikLogin)
    const { korisnikInfo } = korisnikLogin



    useEffect(() => {
        if (korisnikInfo && korisnikInfo.jeAdmin) {
            dispatch(prikaziNarudzbe())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, korisnikInfo])


    return (
        <>
            <h1>Narudžbe</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm text-center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>KORISNIK</th>
                            <th>UKUPNO</th>
                            <th>KREIRANO</th>
                            <th>PLAĆENO</th>
                            <th>DOSTAVLJENO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {narudzbe.map(narudzba => (
                            <tr key={narudzba._id}>
                                <td>{narudzba._id}</td>
                                <td>{narudzba.korisnik && narudzba.korisnik.ime}</td>
                                <td>${narudzba.cijenaUkupno}</td>
                                <td>{narudzba.createdAt.substring(0, 10)}</td>
                                <td>
                                    {narudzba.jePlaceno ? (narudzba.datumPlacanja.substring(0, 10)) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    {narudzba.jeDostavljeno ? (narudzba.datumDostavljanja.substring(0, 10)) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/narudzba/${narudzba._id}`}>
                                        <Button variant='btn btn-primary' className='btn-sm'>
                                            Detalji
                                        </Button>
                                    </LinkContainer>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default NarudzbeListScreen