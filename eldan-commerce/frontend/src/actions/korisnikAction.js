import {
    KORISNIK_LOGIN_FAIL, KORISNIK_LOGIN_REQUEST, KORISNIK_LOGIN_SUCCESS, KORISNIK_LOGOUT,
    KORISNIK_REGISTRIRAJ_REQUEST, KORISNIK_REGISTRIRAJ_SUCCESS, KORISNIK_REGISTRIRAJ_FAIL, KORISNIK_DETALJI_REQUEST, KORISNIK_DETALJI_SUCCESS, KORISNIK_DETALJI_FAIL, KORISNIK_AZURIRAJ_PROFIL_REQUEST, KORISNIK_AZURIRAJ_PROFIL_SUCCESS, KORISNIK_AZURIRAJ_PROFIL_FAIL, KORISNIK_DETALJI_RESET, KORISNIK_LIST_REQUEST, KORISNIK_LIST_SUCCESS, KORISNIK_LIST_FAIL, KORISNIK_LIST_RESET, KORISNIK_DELETE_REQUEST, KORISNIK_DELETE_SUCCESS, KORISNIK_DELETE_FAIL, KORISNIK_AZURIRAJ_REQUEST, KORISNIK_AZURIRAJ_SUCCESS, KORISNIK_AZURIRAJ_FAIL
} from "../konstante/korisniciKonstante"
import axios from 'axios'
import { MOJA_NARUDZBA_RESET } from '../konstante/narudzbaKonstante'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: KORISNIK_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/korisnici/login', { email, password }, config)

        dispatch({
            type: KORISNIK_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('korisnikInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: KORISNIK_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const odjaviSe = () => (dispatch) => {
    localStorage.removeItem('korisnikInfo')
    dispatch({ type: KORISNIK_LOGOUT })
    dispatch({ type: KORISNIK_DETALJI_RESET })
    dispatch({ type: MOJA_NARUDZBA_RESET })
    dispatch({ type: KORISNIK_LIST_RESET })
}


export const registriraj = (ime, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: KORISNIK_REGISTRIRAJ_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/korisnici', { ime, email, password }, config)

        dispatch({
            type: KORISNIK_REGISTRIRAJ_SUCCESS,
            payload: data
        })

        dispatch({
            type: KORISNIK_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('korisnikInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: KORISNIK_REGISTRIRAJ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}



export const getKorisnikDetalji = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: KORISNIK_DETALJI_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/korisnici/${id}`, config)

        dispatch({
            type: KORISNIK_DETALJI_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: KORISNIK_DETALJI_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}



export const azurirajKorisnickiProfil = (korisnik) => async (dispatch, getState) => {
    try {
        dispatch({
            type: KORISNIK_AZURIRAJ_PROFIL_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const { data } = await axios.put('/api/korisnici/profil', korisnik, config)

        dispatch({
            type: KORISNIK_AZURIRAJ_PROFIL_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: KORISNIK_AZURIRAJ_PROFIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}




export const listKorisnici = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: KORISNIK_LIST_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const { data } = await axios.get('/api/korisnici', config)

        dispatch({
            type: KORISNIK_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: KORISNIK_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}



export const delKorisnik = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: KORISNIK_DELETE_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        await axios.delete(`/api/korisnici/${id}`, config)

        dispatch({
            type: KORISNIK_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: KORISNIK_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const azurirajKorisnika = (korisnik) => async (dispatch, getState) => {
    try {
        dispatch({
            type: KORISNIK_AZURIRAJ_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/korisnici/${korisnik._id}`, korisnik, config)

        dispatch({
            type: KORISNIK_AZURIRAJ_SUCCESS,
        })
        dispatch({
            type: KORISNIK_DETALJI_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: KORISNIK_AZURIRAJ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}