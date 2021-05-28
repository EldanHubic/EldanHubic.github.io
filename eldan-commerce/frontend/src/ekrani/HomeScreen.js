import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Proizvod from '../komponente/Proizvod.js'
import { listProizvodi } from '../actions/proizvodAction'
import Message from '../komponente/Message'
import Loader from '../komponente/Loader'


const HomeScreen = () => {
    const dispatch = useDispatch()

    const proizvodList = useSelector(state => state.proizvodList)
    const { loading, error, proizvodi } = proizvodList

    useEffect(() => {
        dispatch(listProizvodi())
    }, [dispatch])


    return (
        <>
            <h1>Najbolji proizvodi</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <Row>
                {proizvodi.map((proizvod) => (
                    <Col key={proizvod._id} sm={12} md={6} lg={4} xl={3}>
                        <Proizvod proizvod={proizvod} />
                    </Col>
                ))}
            </Row>}

        </>
    )
}

export default HomeScreen
