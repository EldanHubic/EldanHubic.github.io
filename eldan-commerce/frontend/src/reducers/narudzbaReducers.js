import { NARUDZBA_KREIRAJ_REQUEST, NARUDZBA_KREIRAJ_SUCCESS, NARUDZBA_KREIRAJ_FAIL, NARUDZBA_DETALJI_REQUEST, NARUDZBA_DETALJI_SUCCESS, NARUDZBA_DETALJI_FAIL, NARUDZBA_PLATI_REQUEST, NARUDZBA_PLATI_SUCCESS, NARUDZBA_PLATI_FAIL, NARUDZBA_PLATI_RESET, MOJA_NARUDZBA_REQUEST, MOJA_NARUDZBA_SUCCESS, MOJA_NARUDZBA_FAIL, MOJA_NARUDZBA_RESET, NARUDZBE_LIST_REQUEST, NARUDZBE_LIST_SUCCESS, NARUDZBE_LIST_FAIL, NARUDZBA_DOSTAVI_REQUEST, NARUDZBA_DOSTAVI_SUCCESS, NARUDZBA_DOSTAVI_FAIL, NARUDZBA_DOSTAVI_RESET } from '../konstante/narudzbaKonstante'

export const kreirajNarudzbuReducer = (state = {}, action) => {
    switch (action.type) {
        case NARUDZBA_KREIRAJ_REQUEST:
            return {
                loading: true
            }
        case NARUDZBA_KREIRAJ_SUCCESS:
            return {
                loading: false,
                success: true,
                narudzba: action.payload,
            }
        case NARUDZBA_KREIRAJ_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}


export const detaljiNarudzbeReducer = (state = { loading: true, naruceniProizvodi: [], adresaDostave: {} }, action) => {
    switch (action.type) {
        case NARUDZBA_DETALJI_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NARUDZBA_DETALJI_SUCCESS:
            return {
                loading: false,
                narudzba: action.payload,
            }
        case NARUDZBA_DETALJI_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}


export const narudzbaPlatiReducer = (state = {}, action) => {
    switch (action.type) {
        case NARUDZBA_PLATI_REQUEST:
            return {
                loading: true
            }
        case NARUDZBA_PLATI_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case NARUDZBA_PLATI_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case NARUDZBA_PLATI_RESET:
            return {}
        default:
            return state
    }
}


export const narudzbaDostaviReducer = (state = {}, action) => {
    switch (action.type) {
        case NARUDZBA_DOSTAVI_REQUEST:
            return {
                loading: true
            }
        case NARUDZBA_DOSTAVI_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case NARUDZBA_DOSTAVI_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case NARUDZBA_DOSTAVI_RESET:
            return {}
        default:
            return state
    }
}



export const listaNarudzbiReducer = (state = { narudzbe: [] }, action) => {
    switch (action.type) {
        case MOJA_NARUDZBA_REQUEST:
            return {
                loading: true
            }
        case MOJA_NARUDZBA_SUCCESS:
            return {
                loading: false,
                narudzbe: action.payload,
            }
        case MOJA_NARUDZBA_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case MOJA_NARUDZBA_RESET:
            return {
                narudzbe: []
            }
        default:
            return state
    }
}


export const sveNarudzbeReducer = (state = { narudzbe: [] }, action) => {
    switch (action.type) {
        case NARUDZBE_LIST_REQUEST:
            return {
                loading: true
            }
        case NARUDZBE_LIST_SUCCESS:
            return {
                loading: false,
                narudzbe: action.payload,
            }
        case NARUDZBE_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
