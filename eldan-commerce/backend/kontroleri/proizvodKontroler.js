import Proizvod from '../modeli/proizvodModel.js'
import asyncHandler from 'express-async-handler'

const dohvatiProizvode = asyncHandler(async (req, res) => {
    const proizvodi = await Proizvod.find({})

    res.json(proizvodi)
})

const dohvatiProizvodePrekoID = asyncHandler(async (req, res) => {
    const proizvod = await Proizvod.findById(req.params.id)

    if (proizvod) {
        res.json(proizvod)
    } else {
        res.status(404)
        throw new Error('Proizvod nije pronadjen')
    }
})



const deleteProizvod = asyncHandler(async (req, res) => {
    const proizvod = await Proizvod.findById(req.params.id)

    if (proizvod) {
        await proizvod.remove()
        res.json({ message: 'Proizvod je izbrisan.' })
    } else {
        res.status(404)
        throw new Error('Proizvod nije pronadjen')
    }
})




const kreirajProizvod = asyncHandler(async (req, res) => {
    const proizvod = new Proizvod({
        korisnik: req.korisnik._id,
        ime: 'Dummy ime',
        slika: 'dummy slika',
        opis: 'Dummy opis',
        brand: 'Dummy brand',
        kategorija: 'Dummy katgorija',
        cijena: 0,
        brojNaStanju: 0,
        brPregleda: 0
    })

    const kreiraniProizvod = await proizvod.save()
    res.status(201).json(kreiraniProizvod)
})


const azurirajProizvod = asyncHandler(async (req, res) => {
    const { ime, cijena, opis, slika, brand, kategorija, brojNaStanju } = req.body

    const proizvod = await Proizvod.findById(req.params.id)


    if (proizvod) {
        proizvod.ime = ime
        proizvod.cijena = cijena
        proizvod.opis = opis
        proizvod.slika = slika
        proizvod.brand = brand
        proizvod.kategorija = kategorija
        proizvod.brojNaStanju = brojNaStanju

        const azuriraniProizvod = await proizvod.save()
        res.status(201).json(azuriraniProizvod)
    } else {
        res.status(404)
        throw new Error('Proizvod nije pronadjen.')
    }


})



export {
    dohvatiProizvode,
    dohvatiProizvodePrekoID,
    deleteProizvod,
    kreirajProizvod,
    azurirajProizvod
}