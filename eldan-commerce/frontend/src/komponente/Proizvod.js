import React from 'react'
import { Card } from 'react-bootstrap'
import Ocjena from './Ocjena'
import { Link } from 'react-router-dom'

const Proizvod = ({ proizvod }) => {
    console.log(proizvod)
    return (
        <>
            <Card className="my-3 p-0 rounded text-left">
                <Link to={`/proizvod/${proizvod._id}`}>
                    <Card.Img className='p-2' variant="top" src={proizvod.slika} />
                </Link>
                <Card.Body>
                    <Link to={`/proizvod/${proizvod._id}`}>
                        <Card.Title as='div'>
                            <strong>{proizvod.ime}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as='div'>
                        <Ocjena ocjena={proizvod.ocjena} brPregleda={proizvod.brPregleda} />
                    </Card.Text>

                    <Card.Text as='h4'>
                        <div className='my-3'>
                            Cijena: <strong>${proizvod.cijena}</strong>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Proizvod
