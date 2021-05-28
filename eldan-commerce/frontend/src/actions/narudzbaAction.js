import { NARUDZBA_KREIRAJ_REQUEST, NARUDZBA_KREIRAJ_SUCCESS, NARUDZBA_KREIRAJ_FAIL, NARUDZBA_DETALJI_REQUEST, NARUDZBA_DETALJI_SUCCESS, NARUDZBA_DETALJI_FAIL, NARUDZBA_PLATI_SUCCESS, NARUDZBA_PLATI_REQUEST, NARUDZBA_PLATI_FAIL, MOJA_NARUDZBA_REQUEST, MOJA_NARUDZBA_SUCCESS, MOJA_NARUDZBA_FAIL, NARUDZBE_LIST_REQUEST, NARUDZBE_LIST_SUCCESS, NARUDZBE_LIST_FAIL, NARUDZBA_DOSTAVI_REQUEST, NARUDZBA_DOSTAVI_SUCCESS } from '../konstante/narudzbaKonstante'
import axios from 'axios'

export const kreirajNarudzbuAkcija = (narudzba) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NARUDZBA_KREIRAJ_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/narudzbe`, narudzba, config)

        dispatch({
            type: NARUDZBA_KREIRAJ_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: NARUDZBA_KREIRAJ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const getDetaljiNarudzbe = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NARUDZBA_DETALJI_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/narudzbe/${id}`, config)

        dispatch({
            type: NARUDZBA_DETALJI_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: NARUDZBA_DETALJI_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const platiNarudzbu = (narudzbaId, rezultatPlacanja) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NARUDZBA_PLATI_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/narudzbe/${narudzbaId}/plati`, rezultatPlacanja, config)

        dispatch({
            type: NARUDZBA_PLATI_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: NARUDZBA_PLATI_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const dostaviNarudzbu = (narudzba) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NARUDZBA_DOSTAVI_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/narudzbe/${narudzba._id}/dostavi`, {}, config)

        dispatch({
            type: NARUDZBA_DOSTAVI_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: NARUDZBA_PLATI_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const prikaziMojeNarudzbe = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MOJA_NARUDZBA_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/narudzbe/mojenarudzbe`, config)

        dispatch({
            type: MOJA_NARUDZBA_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: MOJA_NARUDZBA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const prikaziNarudzbe = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: NARUDZBE_LIST_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/narudzbe`, config)

        dispatch({
            type: NARUDZBE_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: NARUDZBE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}