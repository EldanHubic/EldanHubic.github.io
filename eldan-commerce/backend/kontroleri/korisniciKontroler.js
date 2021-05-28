import Korisnik from '../modeli/korisnikModel.js'
import asyncHandler from 'express-async-handler'
import generirajToken from '../utils/generirajToken.js'

const authKorisnik = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const korisnik = await Korisnik.findOne({ email })

    if (korisnik && (await korisnik.jednakiPasswordi(password))) {
        res.json({
            _id: korisnik._id,
            ime: korisnik.ime,
            email: korisnik.email,
            jeAdmin: korisnik.jeAdmin,
            token: generirajToken(korisnik._id)
        })
    } else {
        res.status(401)
        throw new Error('Netačan email ili password')
    }
})

const registrirajKorisnika = asyncHandler(async (req, res) => {
    const { ime, email, password } = req.body

    const korisnikPostoji = await Korisnik.findOne({ email })

    if (korisnikPostoji) {
        res.status(400)
        throw new Error('Korisnik vec postoji')
    }

    const korisnik = await Korisnik.create({
        ime,
        email,
        password
    })

    if (korisnik) {
        res.status(201).json({
            _id: korisnik._id,
            ime: korisnik.ime,
            email: korisnik.email,
            jeAdmin: korisnik.jeAdmin,
            token: generirajToken(korisnik._id)
        })
    } else {
        res.status(400)
        throw new Error('Netačni korisnički podaci')
    }
})






const getProfilKorisnika = asyncHandler(async (req, res) => {
    const korisnik = await Korisnik.findById(req.korisnik._id)

    if (korisnik) {
        res.json({
            _id: korisnik._id,
            ime: korisnik.ime,
            email: korisnik.email,
            jeAdmin: korisnik.jeAdmin
        })
    } else {
        res.status(404)
        throw new Error('Korisnik nije pronadjen')
    }
})


const updateProfilKorisnika = asyncHandler(async (req, res) => {
    const korisnik = await Korisnik.findById(req.korisnik._id)

    if (korisnik) {
        korisnik.ime = req.body.ime || korisnik.ime
        korisnik.email = req.body.email || korisnik.email
        if (req.body.password) {
            korisnik.password = req.body.password
        }

        const updatedKorisnik = await korisnik.save()

        res.json({
            _id: updatedKorisnik._id,
            ime: updatedKorisnik.ime,
            email: updatedKorisnik.email,
            jeAdmin: updatedKorisnik.jeAdmin,
            token: generirajToken(updatedKorisnik._id)
        })
    } else {
        res.status(404)
        throw new Error('Korisnik nije pronadjen')
    }
})


const getSviKorisnici = asyncHandler(async (req, res) => {
    const korisnici = await Korisnik.find({})
    res.json(korisnici)


})


const deleteKorisnika = asyncHandler(async (req, res) => {
    const korisnik = await Korisnik.findById(req.params.id)

    if (korisnik) {
        await korisnik.remove()
        res.json({ message: 'Korisnik obrisan.' })
    } else {
        res.status(404)
        throw new Error('Korisnik nije pronadjen')
    }


})


const getKorisnikaById = asyncHandler(async (req, res) => {
    const korisnik = await (await Korisnik.findById(req.params.id)).select('-password')


    if (korisnik) {
        res.json(korisnik)
    } else {
        res.status(404)
        throw new Error('Korisnik nije pronadjen.')
    }


})


const updateKorisnika = asyncHandler(async (req, res) => {
    const korisnik = await Korisnik.findById(req.params.id)

    if (korisnik) {
        korisnik.ime = req.body.ime || korisnik.ime
        korisnik.email = req.body.email || korisnik.email
        korisnik.jeAdmin = req.body.jeAdmin

        const updatedKorisnik = await korisnik.save()

        res.json({
            _id: updatedKorisnik._id,
            ime: updatedKorisnik.ime,
            email: updatedKorisnik.email,
            jeAdmin: updatedKorisnik.jeAdmin,
        })
    } else {
        res.status(404)
        throw new Error('Korisnik nije pronadjen')
    }
})

export { authKorisnik, getProfilKorisnika, registrirajKorisnika, updateProfilKorisnika, getSviKorisnici, deleteKorisnika, getKorisnikaById, updateKorisnika }