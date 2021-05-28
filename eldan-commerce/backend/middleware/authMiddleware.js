import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Korisnik from '../modeli/korisnikModel.js'

const zastiti = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const dekodirano = jwt.verify(token, process.env.JWT_SECRET)
            req.korisnik = await Korisnik.findById(dekodirano.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Nemate pristup, token nije ispravan')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Nemate pristup, nema tokena')
    }
})


const admin = (req, res, next) => {
    if (req.korisnik && req.korisnik.jeAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Nemate dozvolu, niste admin.')
    }
}


export { zastiti, admin }