import { PROIZVOD_LIST_REQUEST, PROIZVOD_LIST_SUCCESS, PROIZVOD_LIST_FAIL, PROIZVOD_DELETE_REQUEST, PROIZVOD_DELETE_SUCCESS, PROIZVOD_DELETE_FAIL, PROIZVOD_KREIRAJ_RESET, PROIZVOD_KREIRAJ_REQUEST, PROIZVOD_KREIRAJ_SUCCESS, PROIZVOD_KREIRAJ_FAIL, PROIZVOD_AZURIRAJ_REQUEST, PROIZVOD_AZURIRAJ_SUCCESS, PROIZVOD_AZURIRAJ_FAIL, PROIZVOD_AZURIRAJ_RESET } from '../konstante/proizvodKonstante'
import { PROIZVOD_DETALJI_REQUEST, PROIZVOD_DETALJI_SUCCESS, PROIZVOD_DETALJI_FAIL } from '../konstante/proizvodKonstante'



export const proizvodListReducer = (state = { proizvodi: [] }, action) => {
    switch (action.type) {
        case PROIZVOD_LIST_REQUEST:
            return { loading: true, proizvodi: [] }
        case PROIZVOD_LIST_SUCCESS:
            return { loading: false, proizvodi: action.payload }
        case PROIZVOD_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const proizvodDetaljiReducer = (state = { proizvod: { reviews: [] } }, action) => {
    switch (action.type) {
        case PROIZVOD_DETALJI_REQUEST:
            return { ...state, loading: true }
        case PROIZVOD_DETALJI_SUCCESS:
            return { loading: false, proizvod: action.payload }
        case PROIZVOD_DETALJI_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const proizvodDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PROIZVOD_DELETE_REQUEST:
            return { loading: true }
        case PROIZVOD_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PROIZVOD_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const kreirajProizvodReducer = (state = {}, action) => {
    switch (action.type) {
        case PROIZVOD_KREIRAJ_REQUEST:
            return { loading: true }
        case PROIZVOD_KREIRAJ_SUCCESS:
            return { loading: false, success: true, proizvod: action.payload }
        case PROIZVOD_KREIRAJ_FAIL:
            return { loading: false, error: action.payload }
        case PROIZVOD_KREIRAJ_RESET:
            return {

            }
        default:
            return state
    }
}


export const proizvodAzurirajReducer = (state = { proizvod: {} }, action) => {
    switch (action.type) {
        case PROIZVOD_AZURIRAJ_REQUEST:
            return { loading: true }
        case PROIZVOD_AZURIRAJ_SUCCESS:
            return { loading: false, success: true, proizvod: action.payload }
        case PROIZVOD_AZURIRAJ_FAIL:
            return { loading: false, error: action.payload }
        case PROIZVOD_AZURIRAJ_RESET:
            return {
                proizvod: {}
            }
        default:
            return state
    }
}