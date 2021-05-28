
import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../komponente/FormContainer'
import Koraci from '../komponente/Koraci'
import { sacuvajMetoduPlacanja } from '../actions/korpaAction'


const PlacanjeScreen = ({ history }) => {

    const korpa = useSelector(state => state.korpa)
    const { adresaPostarine } = korpa

    if (!adresaPostarine) {
        history.push('/postarina')
    }


    const [metodaPlacanja, setMetodaPlacanja] = useState('PayPal')


    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(sacuvajMetoduPlacanja(metodaPlacanja))
        history.push('/postavinarudzbu')
    }

    return (
        <FormContainer>
            <Koraci korak1 korak2 korak3 />
            <h1>Metoda Placanja</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Odaberi metodu placanja:</Form.Label>

                    <Col>
                        <Form.Check type='radio' label='PayPal ili Kreditna Kartica' id='PayPal' name='metodaPlacanja' value='PayPal' checked onChange={(e) => setMetodaPlacanja(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant='primary'>Nastavi</Button>
            </Form>
        </FormContainer>
    )
}

export default PlacanjeScreen
