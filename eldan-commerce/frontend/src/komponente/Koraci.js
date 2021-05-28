import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Koraci = ({ korak1, korak2, korak3, korak4 }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {korak1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>
                            Prijavi se
                        </Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Prijavi se</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {korak2 ? (
                    <LinkContainer to='/postarina'>
                        <Nav.Link>
                            Postarina
                        </Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Postarina</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {korak3 ? (
                    <LinkContainer to='/placanje'>
                        <Nav.Link>
                            Placanje
                        </Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Placanje</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {korak4 ? (
                    <LinkContainer to='/postavinarudzbu'>
                        <Nav.Link>
                            Narudzba
                        </Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Narudzba</Nav.Link>}
            </Nav.Item>
        </Nav>
    )
}

export default Koraci
