import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { proizvodListReducer, proizvodDetaljiReducer, proizvodDeleteReducer, kreirajProizvodReducer, proizvodAzurirajReducer } from './reducers/proizvodReducer'
import { korpaReducer } from './reducers/korpaReducers'
import { korisnikLoginReducer, korisnikRegistrirajReducer, korisnikDetaljiReducer, korisnikAzurirajProfilReducer, korisnikListReducer, korisnikDeleteReducer, korisnikAzurirajReducer } from './reducers/korisniciReducer'
import { kreirajNarudzbuReducer, detaljiNarudzbeReducer, narudzbaPlatiReducer, listaNarudzbiReducer, sveNarudzbeReducer, narudzbaDostaviReducer } from './reducers/narudzbaReducers'


const reducer = combineReducers({
    proizvodList: proizvodListReducer,
    proizvodDetalji: proizvodDetaljiReducer,
    korpa: korpaReducer,
    korisnikLogin: korisnikLoginReducer,
    korisnikRegistriraj: korisnikRegistrirajReducer,
    korisnikDetalji: korisnikDetaljiReducer,
    korisnikAzurirajProfil: korisnikAzurirajProfilReducer,
    kreirajNarudzbu: kreirajNarudzbuReducer,
    detaljiNarudzbe: detaljiNarudzbeReducer,
    narudzbaPlati: narudzbaPlatiReducer,
    listaNarudzbi: listaNarudzbiReducer,
    listaKorisnika: korisnikListReducer,
    korisnikDelete: korisnikDeleteReducer,
    korisnikAzuriraj: korisnikAzurirajReducer,
    proizvodDelete: proizvodDeleteReducer,
    kreirajProizvod: kreirajProizvodReducer,
    proizvodAzuriraj: proizvodAzurirajReducer,
    sveNarudzbe: sveNarudzbeReducer,
    narudzbaDostavi: narudzbaDostaviReducer
})

const korpaStavkeIzPohrane = localStorage.getItem('korpaStavka') ? JSON.parse(localStorage.getItem('korpaStavka')) : []
const korisnikInfoIzPohrane = localStorage.getItem('korisnikInfo') ? JSON.parse(localStorage.getItem('korisnikInfo')) : null
const adresaPostarineIzPohrane = localStorage.getItem('adresaPostarine') ? JSON.parse(localStorage.getItem('adresaPostarine')) : {}


const initialState = {
    korpa: {
        korpaStavka: korpaStavkeIzPohrane, adresaPostarine: adresaPostarineIzPohrane,
    },
    korisnikLogin: {
        korisnikInfo: korisnikInfoIzPohrane
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))



export default store