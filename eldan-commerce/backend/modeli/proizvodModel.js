import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ocjena: {
        type: Number,
        required: true
    },
    komentar: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const proizvodSchema = new mongoose.Schema({
    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Korisnik'
    },

    ime: {
        type: String,
        required: true
    },

    slika: {
        type: String,
        required: true
    },
    opis: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    kategorija: {
        type: String,
        required: true
    },
    cijena: {
        type: Number,
        required: true,
        default: 0
    },
    brojNaStanju: {
        type: Number,
        required: true,
        default: 0
    },
    ocjena: {
        type: Number,
        required: true,
        default: 0
    },
    brPregleda: {
        type: Number,
        required: true,
        default: 0
    },

    pregledi: [reviewSchema]


})


const Proizvod = mongoose.model("Proizvod", proizvodSchema);

export default Proizvod