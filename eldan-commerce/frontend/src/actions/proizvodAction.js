import {
    PROIZVOD_LIST_REQUEST, PROIZVOD_LIST_SUCCESS, PROIZVOD_LIST_FAIL,
    PROIZVOD_DETALJI_REQUEST, PROIZVOD_DETALJI_SUCCESS, PROIZVOD_DETALJI_FAIL, PROIZVOD_DELETE_REQUEST, PROIZVOD_DELETE_SUCCESS, PROIZVOD_DELETE_FAIL, PROIZVOD_KREIRAJ_FAIL, PROIZVOD_KREIRAJ_SUCCESS, PROIZVOD_KREIRAJ_REQUEST, PROIZVOD_AZURIRAJ_REQUEST, PROIZVOD_AZURIRAJ_SUCCESS, PROIZVOD_AZURIRAJ_FAIL
} from '../konstante/proizvodKonstante'
import axios from 'axios'



export const listProizvodi = () => async (dispatch) => {
    try {
        dispatch({ type: PROIZVOD_LIST_REQUEST })

        const { data } = await axios.get('/api/proizvodi')

        dispatch({
            type: PROIZVOD_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PROIZVOD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const listProizvodDetalji = (id) => async (dispatch) => {
    try {
        dispatch({ type: PROIZVOD_DETALJI_REQUEST })

        const { data } = await axios.get(`/api/proizvodi/${id}`)

        dispatch({
            type: PROIZVOD_DETALJI_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PROIZVOD_DETALJI_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const deleteProizvod = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROIZVOD_DELETE_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        await axios.delete(`/api/proizvodi/${id}`, config)

        dispatch({
            type: PROIZVOD_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PROIZVOD_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}



export const proizvodKreiraj = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROIZVOD_KREIRAJ_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const data = await axios.post(`/api/proizvodi`, {}, config)

        dispatch({
            type: PROIZVOD_KREIRAJ_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PROIZVOD_KREIRAJ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}



export const azurirajProizvod = (proizvod) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROIZVOD_AZURIRAJ_REQUEST
        })

        const { korisnikLogin: { korisnikInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${korisnikInfo.token}`
            }
        }

        const data = await axios.put(`/api/proizvodi/${proizvod._id}`, proizvod, config)

        dispatch({
            type: PROIZVOD_AZURIRAJ_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PROIZVOD_AZURIRAJ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}