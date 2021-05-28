import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../komponente/Message'
import Loader from '../komponente/Loader'
import { listProizvodi, deleteProizvod, proizvodKreiraj } from '../actions/proizvodAction'
import { PROIZVOD_KREIRAJ_RESET } from '../konstante/proizvodKonstante'


function ListaProizvodaScreen({ history, match }) {
    const dispatch = useDispatch()

    const proizvodList = useSelector(state => state.proizvodList)
    const { loading, error, proizvodi } = proizvodList

    const proizvodDelete = useSelector(state => state.proizvodDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = proizvodDelete

    const kreirajProizvod = useSelector(state => state.kreirajProizvod)
    const { loading: loadingKreiraj, error: errorKreiraj, success: successKreiraj, proizvod: kreiraniProizvod } = kreirajProizvod


    const korisnikLogin = useSelector(state => state.korisnikLogin)
    const { korisnikInfo } = korisnikLogin



    useEffect(() => {
        dispatch({ type: PROIZVOD_KREIRAJ_RESET })
        if (!korisnikInfo.jeAdmin) {
            history.push('/login')
        }

        if (successKreiraj) {
            history.push(`/admin/listaproizvoda`)
        } else {
            dispatch(listProizvodi())
        }
    }, [dispatch, history, korisnikInfo, successDelete, successKreiraj, kreiraniProizvod])

    const deleteHandler = (id) => {
        if (window.confirm('Jeste li sigurni ?')) {
            dispatch(deleteProizvod(id))
        }
    }

    const kreirajProizvodHandler = () => {
        dispatch(proizvodKreiraj())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Proizvodi</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={kreirajProizvodHandler}>
                        <i className='fas fa-plus'></i> Kreiraj Proizvod
                </Button>

                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingKreiraj && <Loader />}
            {errorKreiraj && <Message variant='danger'>{errorKreiraj}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>IME</th>
                            <th>CIJENA</th>
                            <th>KATEGORIJA</th>
                            <th>BRAND</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proizvodi.map(proizvod => (
                            <tr key={proizvod._id}>
                                <td>{proizvod._id}</td>
                                <td>{proizvod.ime}</td>
                                <td>${proizvod.cijena}</td>
                                <td>{proizvod.kategorija}</td>
                                <td>
                                    {proizvod.brand}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/proizvod/${proizvod._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(proizvod._id)}>
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

export default ListaProizvodaScreen

