import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { odjaviSe } from '../actions/korisnikAction';


const Header = () => {
    const dispatch = useDispatch()

    const korisnikLogin = useSelector(state => state.korisnikLogin)
    const { korisnikInfo } = korisnikLogin

    const odjavaHandler = () => {
        dispatch(odjaviSe())
    }
    return (
        <header>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ELDAN-COMMERCE</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/korpa">
                                <Nav.Link><i className="fas fa-shopping-cart"></i> Korpa</Nav.Link>
                            </LinkContainer>
                            {korisnikInfo ? (
                                <NavDropdown title={korisnikInfo.ime} id='korisnickoime'>
                                    <LinkContainer to='/profil'>
                                        <NavDropdown.Item>Profil</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={odjavaHandler}>Odjavi se</NavDropdown.Item>
                                </NavDropdown>
                            ) : <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user"></i> Prijava</Nav.Link>
                                </LinkContainer>
                            }
                            {korisnikInfo && korisnikInfo.jeAdmin && (
                                <NavDropdown title='Admin' id='adminmeni'>
                                    <LinkContainer to='/admin/listakorisnika'>
                                        <NavDropdown.Item>Korisnici</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/listaproizvoda'>
                                        <NavDropdown.Item>Lista proizvoda</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/listanarudzbi'>
                                        <NavDropdown.Item>Lista narudzbi</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={odjavaHandler}>Odjavi se</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header

