import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../komponente/Message'
import Loader from '../komponente/Loader'
import FormContainer from '../komponente/FormContainer'
import { listProizvodDetalji, azurirajProizvod } from '../actions/proizvodAction'
import { PROIZVOD_AZURIRAJ_RESET } from '../konstante/proizvodKonstante'
import axios from 'axios'

const EditProizvodScreen = ({ match, history }) => {
    const proizvodId = match.params.id
    const [ime, setIme] = useState('')
    const [cijena, setCijena] = useState(0)
    const [slika, setSlika] = useState('')
    const [brand, setBrand] = useState('')
    const [kategorija, setKategorija] = useState('')
    const [brojNaStanju, setBrojNaStanju] = useState('')
    const [opis, setOpis] = useState('')
    const [uploading, setUploading] = useState(false)




    const dispatch = useDispatch()

    const proizvodDetalji = useSelector(state => state.proizvodDetalji)
    const { loading, error, proizvod } = proizvodDetalji


    const proizvodAzuriraj = useSelector(state => state.proizvodAzuriraj)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = proizvodAzuriraj



    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PROIZVOD_AZURIRAJ_RESET })
            history.push('/admin/listaproizvoda')
        } else {
            if (!proizvod.ime || proizvod._id !== proizvodId) {
                dispatch(listProizvodDetalji(proizvodId))
            } else {
                setIme(proizvod.ime)
                setCijena(proizvod.cijena)
                setSlika(proizvod.slika)
                setBrand(proizvod.brand)
                setKategorija(proizvod.kategorija)
                setBrojNaStanju(proizvod.brojNaStanju)
                setOpis(proizvod.opis)
            }
        }

    }, [dispatch, proizvod, proizvodId, successUpdate, history])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('slika', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setSlika(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(azurirajProizvod({
            _id: proizvodId,
            ime,
            cijena,
            slika,
            brand,
            kategorija,
            opis,
            brojNaStanju
        }))
    }

    return (
        <>
            <Link to='/admin/listaproizvoda' className='btn btn-light my-3'>Nazad</Link>
            <FormContainer>
                <h1>Ažuriraj proizvod</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='ime'>
                            <Form.Label>Ime</Form.Label>
                            <Form.Control type='text' placeholder='Unesite ime' value={ime} onChange={(e) => setIme(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='cijena'>
                            <Form.Label>Cijena</Form.Label>
                            <Form.Control type='number' placeholder='Unesite cijenu' value={cijena} onChange={(e) => setCijena(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='slika'>
                            <Form.Label>Slika</Form.Label>
                            <Form.Control type='text' placeholder='Slika' value={slika} onChange={(e) => setSlika(e.target.value)}></Form.Control>
                            <Form.File id='slika-file' label='Izaberi file' custom onChange={uploadFileHandler}>

                            </Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='kategorija'>
                            <Form.Label>Kateogrija</Form.Label>
                            <Form.Control type='text' placeholder='Kategorija' value={kategorija} onChange={(e) => setKategorija(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brojNaStanju'>
                            <Form.Label>Broj na stanju</Form.Label>
                            <Form.Control type='number' placeholder='Broj na stanju' value={brojNaStanju} min={0} max={15} onChange={(e) => setBrojNaStanju(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='opis'>
                            <Form.Label>Opis</Form.Label>
                            <Form.Control type='text' placeholder='Opis' value={opis} onChange={(e) => setOpis(e.target.value)}></Form.Control>
                        </Form.Group>



                        <Button type='submit' variant='primary'>Ažuriraj</Button>
                    </Form>
                )}

            </FormContainer>
        </>

    )

}
export default EditProizvodScreen