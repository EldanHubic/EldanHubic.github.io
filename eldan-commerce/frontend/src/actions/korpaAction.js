import axios from 'axios'
import { KORPA_DODAJ_STAVKU, KORPA_UKLONI_STAVKU, KORPA_SACUVAJ_ADRESU_POSTARINE, KORPA_SACUVAJ_METODU_PLACANJA } from '../konstante/korpaKonstante'

export const dodajUKorpu = (id, kolicina) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/proizvodi/${id}`)

    dispatch({
        type: KORPA_DODAJ_STAVKU,
        payload: {
            proizvod: data._id,
            ime: data.ime,
            slika: data.slika,
            cijena: data.cijena,
            brojNaStanju: data.brojNaStanju,
            kolicina
        }
    })

    localStorage.setItem('korpaStavka', JSON.stringify(getState().korpa.korpaStavka))
}

export const ukloniIzKorpe = (id) => (dispatch, getState) => {
    dispatch({
        type: KORPA_UKLONI_STAVKU,
        payload: id
    })

    localStorage.setItem('korpaStavka', JSON.stringify(getState().korpa.korpaStavka))
}


export const sacuvajAdresuPostarine = (data) => (dispatch) => {
    dispatch({
        type: KORPA_SACUVAJ_ADRESU_POSTARINE,
        payload: data,
    })

    localStorage.setItem('adresaPostarine', JSON.stringify(data))
}


export const sacuvajMetoduPlacanja = (data) => (dispatch) => {
    dispatch({
        type: KORPA_SACUVAJ_METODU_PLACANJA,
        payload: data,
    })

    localStorage.setItem('metodaPlacanja', JSON.stringify(data))
} 