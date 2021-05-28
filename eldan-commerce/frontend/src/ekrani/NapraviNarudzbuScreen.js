import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Koraci from '../komponente/Koraci'
import Message from '../komponente/Message'
import { Link } from 'react-router-dom'
import { kreirajNarudzbuAkcija } from '../actions/narudzbaAction'

function NapraviNarudzbuScreen({ history }) {
    const dispatch = useDispatch()
    const korpa = useSelector(state => state.korpa)

    const dodajDecimale = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    //izracunaj cijene
    korpa.cijenaProizvoda = dodajDecimale(korpa.korpaStavka.reduce((acc, item) => acc + item.cijena * item.kolicina, 0))
    korpa.cijenaDostave = dodajDecimale(korpa.cijenaProizvoda > 100 ? 0 : 100)
    korpa.cijenaPoreza = dodajDecimale(Number((0.15 * korpa.cijenaProizvoda).toFixed(2)))
    korpa.cijenaUkupno = (Number(korpa.cijenaProizvoda) + Number(korpa.cijenaDostave) + Number(korpa.cijenaPoreza)).toFixed(2)

    const kreirajNarudzbu = useSelector((state) => state.kreirajNarudzbu)
    const { narudzba, success, error } = kreirajNarudzbu

    useEffect(() => {
        if (success) {
            history.push(`/narudzba/${narudzba._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])


    const kreirajDostavuHandler = () => {
        dispatch(kreirajNarudzbuAkcija({
            naruceniProizvodi: korpa.korpaStavka,
            adresaDostave: korpa.adresaPostarine,
            metodaPlacanja: korpa.metodaPlacanja,
            cijenaProizvoda: korpa.cijenaProizvoda,
            cijenaDostave: korpa.cijenaDostave,
            cijenaPoreza: korpa.cijenaPoreza,
            cijenaUkupno: korpa.cijenaUkupno
        }))
    }
    return (
        <>
            <Koraci korak1 korak2 korak3 korak4 />
            <Row>
                <Col md={8}>
                    <ListGroup varint='flush'>
                        <ListGroup.Item>
                            <h2>Dostava</h2>
                            <p>
                                <strong>Adresa: </strong>
                                {korpa.adresaPostarine.adresa}{' '},
                                {korpa.adresaPostarine.grad}{' '},
                                {korpa.adresaPostarine.postanskiBroj}{' '},
                                {korpa.adresaPostarine.drzava}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Metoda plaćanja</h2>
                            <strong>Metoda: </strong>
                            {korpa.metodaPlacanja}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Proizvodi koje želite naručiti: </h2>
                            {korpa.korpaStavka.length === 0 ? <Message>Vaša korpa je prazna</Message> : (
                                <ListGroup variant='flush'>
                                    {korpa.korpaStavka.map((proizvod, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={proizvod.slika} alt={proizvod.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/proizvod/${proizvod.proizvod}`}>{proizvod.ime}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {proizvod.kolicina} x ${proizvod.cijena} = ${proizvod.kolicina * proizvod.cijena}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Dostava konačno: </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Proizvodi</Col>
                                    <Col>${korpa.cijenaProizvoda}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Dostava</Col>
                                    <Col>${korpa.cijenaDostave}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Porez</Col>
                                    <Col>${korpa.cijenaPoreza}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>UKUPNO</Col>
                                    <Col>${korpa.cijenaUkupno}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={korpa.korpaStavka === 0} onClick={kreirajDostavuHandler}>Naruči</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default NapraviNarudzbuScreen
