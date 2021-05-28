import Narudzba from '../modeli/narudzbaModel.js'
import asyncHandler from 'express-async-handler'

const addNarudzbaProizvodi = asyncHandler(async (req, res) => {
    const { naruceniProizvodi, adresaDostave, metodaPlacanja, cijenaProizvoda, cijenaPoreza, cijenaDostave, cijenaUkupno } = req.body

    if (naruceniProizvodi && naruceniProizvodi === 0) {
        res.status(400)
        throw new Error('Nema naručenih proizvoda')
        return
    } else {
        const narudzba = new Narudzba({
            naruceniProizvodi,
            korisnik: req.korisnik._id,
            adresaDostave,
            metodaPlacanja,
            cijenaProizvoda,
            cijenaPoreza,
            cijenaDostave,
            cijenaUkupno
        })

        const kreiranaNarudzba = await narudzba.save()

        res.status(201).json(kreiranaNarudzba)
    }


})



const getNarudzbaById = asyncHandler(async (req, res) => {
    const narudzba = await await Narudzba.findById(req.params.id).populate('korisnik', 'ime email')

    if (narudzba) {
        res.json(narudzba)
    } else {
        res.status(404)
        throw new Error('Narudžba nije pronađena.')
    }
})

const updateNarudzbaNaPlaceno = asyncHandler(async (req, res) => {
    const narudzba = await Narudzba.findById(req.params.id)

    if (narudzba) {
        narudzba.jePlaceno = true
        narudzba.datumPlacanja = Date.now()
        narudzba.rezultatPlacanja = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const azuriranaNarudzba = await narudzba.save()
        res.json(azuriranaNarudzba)
    } else {
        res.status(404)
        throw new Error('Narudžba nije pronađena.')
    }
})



const updateNarudzbaNaDostavljeno = asyncHandler(async (req, res) => {
    const narudzba = await Narudzba.findById(req.params.id)

    if (narudzba) {
        narudzba.jeDostavljeno = true
        narudzba.datumDostavljanja = Date.now()


        const azuriranaNarudzba = await narudzba.save()
        res.json(azuriranaNarudzba)
    } else {
        res.status(404)
        throw new Error('Narudžba nije pronađena.')
    }
})

const getMojeNarudzbe = asyncHandler(async (req, res) => {
    const narudzbe = await Narudzba.find({ korisnik: req.korisnik._id })
    res.json(narudzbe)
})



const getNarudzbe = asyncHandler(async (req, res) => {
    const narudzbe = await Narudzba.find({}).populate('korisnik', 'id ime')
    res.json(narudzbe)
})

export { addNarudzbaProizvodi, getNarudzbaById, updateNarudzbaNaPlaceno, getMojeNarudzbe, getNarudzbe, updateNarudzbaNaDostavljeno }



