import { KORPA_DODAJ_STAVKU, KORPA_UKLONI_STAVKU, KORPA_SACUVAJ_ADRESU_POSTARINE, KORPA_SACUVAJ_METODU_PLACANJA } from '../konstante/korpaKonstante'


export const korpaReducer = (state = { korpaStavka: [], adresaPostarine: {} }, action) => {
    switch (action.type) {
        case KORPA_DODAJ_STAVKU:
            const stavka = action.payload

            const postojecaStavka = state.korpaStavka.find(x => x.proizvod === stavka.proizvod)

            if (postojecaStavka) {
                return {
                    ...state,
                    korpaStavka: state.korpaStavka.map(x => x.proizvod === postojecaStavka.proizvod ? stavka : x)
                }
            } else {
                return {
                    ...state,
                    korpaStavka: [...state.korpaStavka, stavka]
                }
            }

        case KORPA_UKLONI_STAVKU:
            return {
                ...state,
                korpaStavka: state.korpaStavka.filter(x => x.proizvod !== action.payload)
            }

        case KORPA_SACUVAJ_ADRESU_POSTARINE:
            return {
                ...state,
                adresaPostarine: action.payload,
            }
        case KORPA_SACUVAJ_METODU_PLACANJA:
            return {
                ...state,
                metodaPlacanja: action.payload,
            }
        default:
            return state
    }
}