import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../komponente/Loader'
import Message from '../komponente/Message'
import { Link } from 'react-router-dom'
import { getDetaljiNarudzbe, platiNarudzbu, dostaviNarudzbu } from '../actions/narudzbaAction'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { NARUDZBA_PLATI_RESET, NARUDZBA_DOSTAVI_RESET } from '../konstante/narudzbaKonstante'

function DetaljiNarudzbeScreen({ match, history }) {
    const narudzbaId = match.params.id
    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const korisnikLogin = useSelector((state) => state.korisnikLogin)
    const { korisnikInfo } = korisnikLogin

    const detaljiNarudzbe = useSelector((state) => state.detaljiNarudzbe)
    const { narudzba, loading, error } = detaljiNarudzbe

    const narudzbaPlati = useSelector((state) => state.narudzbaPlati)
    const { loading: loadingPlati, success: successPlati } = narudzbaPlati

    const narudzbaDostavi = useSelector((state) => state.narudzbaDostavi)
    const { loading: loadingDostavi, success: successDostavi } = narudzbaDostavi

    if (!loading) {
        const dodajDecimale = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        //izracunaj cijene
        narudzba.cijenaProizvoda = dodajDecimale(narudzba.naruceniProizvodi.reduce((acc, item) => acc + item.cijena * item.kolicina, 0))
    }


    useEffect(() => {
        if (!korisnikInfo) {
            history.push('/login')
        }
        const dodajPayPalSkriptu = async () => {
            const { data: klijentId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${klijentId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!narudzba || successPlati || successDostavi) {
            dispatch({ type: NARUDZBA_PLATI_RESET })
            dispatch({ type: NARUDZBA_DOSTAVI_RESET })
            dispatch(getDetaljiNarudzbe(narudzbaId))
        } else if (!narudzba.jePlaceno) {
            if (!window.paypal) {
                dodajPayPalSkriptu()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, narudzbaId, successPlati, successDostavi, narudzba, history, korisnikInfo])

    const uspjesnoPlacenoHandler = (rezultatPlacanja) => {
        console.log(rezultatPlacanja)
        dispatch(platiNarudzbu(narudzbaId, rezultatPlacanja))
    }


    const dostaviHandler = () => {
        dispatch(dostaviNarudzbu(narudzba))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1>Narudzba {narudzba._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup varint='flush'>
                    <ListGroup.Item>
                        <h2>Dostava</h2>
                        <p>
                            <strong>Ime:</strong> {narudzba.korisnik.ime}
                        </p>
                        <p>
                            <strong>Email:</strong> <a href='www.gmail.com'> {narudzba.korisnik.email} </a>
                        </p>
                        <p>
                            <strong>Adresa: </strong>
                            {narudzba.adresaDostave.adresa}{' '},
                                {narudzba.adresaDostave.grad}{' '},
                                {narudzba.adresaDostave.postanskiBroj}{' '},
                                {narudzba.adresaDostave.drzava}
                        </p>
                        {narudzba.jeDostavljeno ? <Message variant='success'>Dostavljeno datuma: {narudzba.datumDostavljanja.substring(0, 10)}</Message> : <Message variant='danger'>Nije dostavljeno</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Metoda plaćanja</h2>
                        <p>
                            <strong>Metoda: </strong>
                            {narudzba.metodaPlacanja}
                        </p>
                        {narudzba.jePlaceno ? <Message variant='success'>Plaćeno datuma: {narudzba.datumPlacanja.substring(0, 10)}</Message> : <Message variant='danger'>Nije plaćeno</Message>}
                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2>Proizvodi koje želite naručiti: </h2>
                        {narudzba.naruceniProizvodi.length === 0 ? <Message>Vaša korpa je prazna</Message> : (
                            <ListGroup variant='flush'>
                                {narudzba.naruceniProizvodi.map((proizvod, index) => (
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
                                <Col>${narudzba.cijenaProizvoda}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Dostava</Col>
                                <Col>${narudzba.cijenaDostave}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Porez</Col>
                                <Col>${narudzba.cijenaPoreza}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>UKUPNO</Col>
                                <Col>${narudzba.cijenaUkupno}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!narudzba.jePlaceno && (
                            <ListGroup.Item>
                                {loadingPlati && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={narudzba.cijenaUkupno} onSuccess={uspjesnoPlacenoHandler} />
                                )}
                            </ListGroup.Item>
                        )}
                        {loadingDostavi && <Loader />}
                        {korisnikInfo && korisnikInfo.jeAdmin && narudzba.jePlaceno && !narudzba.jeDostavljeno && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={dostaviHandler}>Označi kao dostavljeno</Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default DetaljiNarudzbeScreen
