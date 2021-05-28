import Header from './komponente/Header'
import Footer from './komponente/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './ekrani/HomeScreen'
import ProizvodScreen from './ekrani/ProizvodScreen'
import KorpaScreen from './ekrani/KorpaScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginScreen from './ekrani/LoginScreen'
import RegistracijaScreen from './ekrani/RegistracijaScreen'
import ProfilScreen from './ekrani/ProfilScreen'
import PostarinaScreen from './ekrani/PostarinaScreen'
import PlacanjeScreen from './ekrani/PlacanjeScreen'
import NapraviNarudzbuScreen from './ekrani/NapraviNarudzbuScreen'
import DetaljiNarudzbeScreen from './ekrani/DetaljiNarudzbeScreen'
import ListaKorisnikaScreen from './ekrani/ListaKorisnikaScreen'
import KorisnikEditScreen from './ekrani/KorisnikEditScreen'
import ListaProizvodaScreen from './ekrani/ListaProizvodaScreen'
import EditProizvodScreen from './ekrani/EditProizvodScreen'
import NarudzbeListScreen from './ekrani/NarudzbeListScreen'


function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className="py-3 ">
          <Route path='/narudzba/:id' component={DetaljiNarudzbeScreen} />
          <Route path="/postarina" component={PostarinaScreen} />
          <Route path='/placanje' component={PlacanjeScreen} />
          <Route path='/postavinarudzbu' component={NapraviNarudzbuScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/registracija" component={RegistracijaScreen} />
          <Route path='/profil' component={ProfilScreen} />
          <Route path="/proizvod/:id" component={ProizvodScreen} />
          <Route path='/admin/listakorisnika' component={ListaKorisnikaScreen} />
          <Route path='/admin/listaproizvoda' component={ListaProizvodaScreen} />
          <Route path='/admin/listanarudzbi' component={NarudzbeListScreen} />
          <Route path='/admin/proizvod/:id/edit' component={EditProizvodScreen} />
          <Route path='/admin/korisnik/:id/edit' component={KorisnikEditScreen} />
          <Route path="/korpa/:id?" component={KorpaScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
