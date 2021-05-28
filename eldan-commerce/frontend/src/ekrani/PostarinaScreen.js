import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../komponente/FormContainer'
import Koraci from '../komponente/Koraci'
import { sacuvajAdresuPostarine } from '../actions/korpaAction'


const PostarinaScreen = ({ history }) => {

    const korpa = useSelector(state => state.korpa)
    const { adresaPostarine } = korpa

    const [adresa, setAdresa] = useState(adresaPostarine.adresa)
    const [grad, setGrad] = useState(adresaPostarine.grad)
    const [postanskiBroj, setPostanskiBroj] = useState(adresaPostarine.postanskiBroj)
    const [drzava, setDrzava] = useState(adresaPostarine.drzava)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(sacuvajAdresuPostarine({ adresa, grad, postanskiBroj, drzava }))
        history.push('/placanje')
    }

    return (
        <FormContainer>
            <Koraci korak1 korak2 />
            <h1>Postarina</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='adresa'>
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control type='text' placeholder='Unesite adresu' value={adresa} onChange={(e) => setAdresa(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='grad'>
                    <Form.Label>Grad</Form.Label>
                    <Form.Control type='text' placeholder='Unesite grad' value={grad} onChange={(e) => setGrad(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='postanskiBroj'>
                    <Form.Label>Postanski broj</Form.Label>
                    <Form.Control type='text' placeholder='Unesite postanski broj' value={postanskiBroj} onChange={(e) => setPostanskiBroj(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='drzava'>
                    <Form.Label>Drzava</Form.Label>
                    <Form.Control type='text' placeholder='Unesite drzavu' value={drzava} onChange={(e) => setDrzava(e.target.value)} required></Form.Control>
                </Form.Group>
                <Button type="submit" variant='primary'>Nastavi</Button>
            </Form>
        </FormContainer>
    )
}

export default PostarinaScreen
