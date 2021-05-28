import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Button, Card, ListGroup, Image, Form } from 'react-bootstrap'
import Ocjena from '../komponente/Ocjena'
import { listProizvodDetalji } from '../actions/proizvodAction'
import Message from '../komponente/Message'
import Loader from '../komponente/Loader'


const ProizvodScreen = ({ history, match }) => {
    const [kolicina, setKolicina] = useState(1)
    const dispatch = useDispatch()

    const proizvodDetalji = useSelector(state => state.proizvodDetalji)
    const { loading, error, proizvod } = proizvodDetalji
    useEffect(() => {
        dispatch(listProizvodDetalji(match.params.id))
    }, [dispatch, match])

    const uKorpuDodajHandler = () => {
        history.push(`/korpa/${match.params.id}?kolicina=${kolicina}`)
    }

    return (
        <>
            <Link to="/"><Button className="btn-primary dark my-3">Nazad</Button></Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <Row>
                <Col md={5}>
                    <Image src={proizvod.slika} alt={proizvod.ime} fluid />
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{proizvod.ime}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Ocjena ocjena={proizvod.ocjena} brPregleda={proizvod.brPregleda} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Cijena: ${proizvod.cijena}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Opis: {proizvod.opis}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Cijena:
                                    </Col>
                                    <Col>
                                        <strong>${proizvod.cijena}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Na stanju:
                                    </Col>
                                    <Col>
                                        <strong>{proizvod.brojNaStanju}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {proizvod.brojNaStanju > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Količina</Col>
                                        <Col>
                                            <Form.Control as='select' value={kolicina} onChange={(e) => {
                                                setKolicina(e.target.value)
                                            }}>
                                                {
                                                    [...Array(proizvod.brojNaStanju).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button onClick={uKorpuDodajHandler} className="btn-block btn-primary" disabled={proizvod.brojNaStanju === 0}>Dodaj u korpu</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>}

        </>
    )
}

export default ProizvodScreen
