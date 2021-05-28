import mongoose from 'mongoose'

const narudzbaSchema = new mongoose.Schema({
    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Korisnik'
    },
    naruceniProizvodi: [
        {
            ime: {
                type: String,
                required: true
            },
            kolicina: {
                type: Number,
                required: true
            },
            slika: {
                type: String,
                required: true
            },
            cijena: {
                type: Number,
                required: true
            },
            proizvod: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Proizvod'
            }
        }
    ],

    adresaDostave: {
        adresa: {
            type: String,
            required: true
        },
        grad: {
            type: String,
            required: true
        },
        drzava: {
            type: String,
            required: true
        },
        postanskiBroj: {
            type: Number,
            required: true
        }

    },

    metodaPlacanja: {
        type: String,
        required: true
    },

    rezultatPlacanja: {
        id: {
            type: String
        },
        status: {
            type: String
        },
        vrijeme_apdejta: {
            type: String
        },
        email_adresa: {
            type: String
        }
    },

    cijenaPoreza: {
        type: Number,
        required: true,
        default: 0.0
    },

    cijenaDostave: {
        type: Number,
        required: true,
        default: 0.0
    },

    cijenaUkupno: {
        type: Number,
        required: true,
        default: 0.0
    },

    jePlaceno: {
        type: Boolean,
        required: true,
        default: false
    },

    datumPlacanja: {
        type: Date
    },

    jeDostavljeno: {
        type: Boolean,
        required: true,
        default: false
    },


    datumDostavljanja: {
        type: Date
    }

}, {
    timestamps: true
})


const Narudzba = mongoose.model("Narudzba", narudzbaSchema);


export default Narudzba