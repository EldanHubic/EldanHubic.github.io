import {
    KORISNIK_LOGIN_FAIL, KORISNIK_LOGIN_REQUEST, KORISNIK_LOGIN_SUCCESS, KORISNIK_LOGOUT,
    KORISNIK_REGISTRIRAJ_REQUEST, KORISNIK_REGISTRIRAJ_SUCCESS, KORISNIK_REGISTRIRAJ_FAIL,
    KORISNIK_DETALJI_REQUEST, KORISNIK_DETALJI_SUCCESS, KORISNIK_DETALJI_FAIL, KORISNIK_AZURIRAJ_PROFIL_REQUEST, KORISNIK_AZURIRAJ_PROFIL_SUCCESS, KORISNIK_AZURIRAJ_PROFIL_FAIL, KORISNIK_DETALJI_RESET, KORISNIK_LIST_REQUEST, KORISNIK_LIST_SUCCESS, KORISNIK_LIST_FAIL, KORISNIK_LIST_RESET, KORISNIK_DELETE_REQUEST, KORISNIK_DELETE_SUCCESS, KORISNIK_DELETE_FAIL, KORISNIK_AZURIRAJ_REQUEST, KORISNIK_AZURIRAJ_SUCCESS, KORISNIK_AZURIRAJ_FAIL, KORISNIK_AZURIRAJ_RESET
} from "../konstante/korisniciKonstante"

export const korisnikLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case KORISNIK_LOGIN_REQUEST:
            return { loading: true }
        case KORISNIK_LOGIN_SUCCESS:
            return { loading: false, korisnikInfo: action.payload }
        case KORISNIK_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case KORISNIK_LOGOUT:
            return {

            }
        default:
            return state
    }
}


export const korisnikRegistrirajReducer = (state = {}, action) => {
    switch (action.type) {
        case KORISNIK_REGISTRIRAJ_REQUEST:
            return { loading: true }
        case KORISNIK_REGISTRIRAJ_SUCCESS:
            return { loading: false, korisnikInfo: action.payload }
        case KORISNIK_REGISTRIRAJ_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const korisnikDetaljiReducer = (state = { korisnik: {} }, action) => {
    switch (action.type) {
        case KORISNIK_DETALJI_REQUEST:
            return { ...state, loading: true }
        case KORISNIK_DETALJI_SUCCESS:
            return { loading: false, korisnik: action.payload }
        case KORISNIK_DETALJI_FAIL:
            return { loading: false, error: action.payload }
        case KORISNIK_DETALJI_RESET:
            return {
                korisnik: {}
            }
        default:
            return state
    }
}


export const korisnikAzurirajProfilReducer = (state = {}, action) => {
    switch (action.type) {
        case KORISNIK_AZURIRAJ_PROFIL_REQUEST:
            return { ...state, loading: true }
        case KORISNIK_AZURIRAJ_PROFIL_SUCCESS:
            return { loading: false, uspjesno: true, korisnikInfo: action.payload }
        case KORISNIK_AZURIRAJ_PROFIL_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const korisnikListReducer = (state = { korisnici: [] }, action) => {
    switch (action.type) {
        case KORISNIK_LIST_REQUEST:
            return { loading: true }
        case KORISNIK_LIST_SUCCESS:
            return { loading: false, korisnici: action.payload }
        case KORISNIK_LIST_FAIL:
            return { loading: false, error: action.payload }
        case KORISNIK_LIST_RESET:
            return {
                korisnici: []
            }
        default:
            return state
    }
}

export const korisnikDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case KORISNIK_DELETE_REQUEST:
            return { loading: true }
        case KORISNIK_DELETE_SUCCESS:
            return { loading: false, success: true }
        case KORISNIK_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const korisnikAzurirajReducer = (state = {}, action) => {
    switch (action.type) {
        case KORISNIK_AZURIRAJ_REQUEST:
            return { loading: true }
        case KORISNIK_AZURIRAJ_SUCCESS:
            return { loading: false, success: true }
        case KORISNIK_AZURIRAJ_FAIL:
            return { loading: false, error: action.payload }
        case KORISNIK_AZURIRAJ_RESET:
            return {
                korisnik: {}
            }
        default:
            return state
    }
}