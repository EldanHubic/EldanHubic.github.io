import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../komponente/Message'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { dodajUKorpu, ukloniIzKorpe } from '../actions/korpaAction'



const KorpaScreen = ({ match, location, history }) => {
    const proizvodID = match.params.id

    const kolicina = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const korpa = useSelector(state => state.korpa)
    const { korpaStavka } = korpa



    useEffect(() => {
        if (proizvodID) {
            dispatch(dodajUKorpu(proizvodID, kolicina))
        }
    }, [dispatch, proizvodID, kolicina])

    const ukloniIzKorpeHandler = (id) => {
        dispatch(ukloniIzKorpe(id))
    }

    const kupovinaHandler = () => {
        history.push('/login?redirect=postarina')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>KORPA ZA KUPOVINU</h1>
                {korpaStavka.length === 0 ? (<Message>Vaša korpa je prazna <Link to='/'>Nazad</Link></Message>) : (
                    <ListGroup variant='flush'>
                        {korpaStavka.map(stavka => (
                            <ListGroup.Item key={stavka.proizvod}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={stavka.slika} alt={stavka.ime} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/proizvod/${stavka.proizvod}`}>{stavka.ime}</Link>
                                    </Col>
                                    <Col md={2}>${stavka.cijena}</Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={stavka.kolicina} onChange={(e) => {
                                            dispatch(dodajUKorpu(stavka.proizvod, Number(e.target.value)))
                                        }}>
                                            {
                                                [...Array(stavka.brojNaStanju).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2} >
                                        <Button type='button' variant='light' onClick={() => ukloniIzKorpeHandler(stavka.proizvod)}><i className='fas fa-trash'></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>UKUPNO ({korpaStavka.reduce((acc, trenutnaStavka) =>
                                acc + trenutnaStavka.kolicina, 0)}
                        ) STAVKI</h2>
                        ${korpaStavka.reduce((acc, trenutnaStavka) =>
                                    acc + trenutnaStavka.kolicina * trenutnaStavka.cijena, 0).toFixed(2)
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={korpaStavka.length === 0} onClick={kupovinaHandler}>Nastavi za kupovinu</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>


            </Col>
        </Row>
    )
}

export default KorpaScreen
