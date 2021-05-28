import express, { json } from 'express'
import { dohvatiProizvode, dohvatiProizvodePrekoID, deleteProizvod, kreirajProizvod, azurirajProizvod } from '../kontroleri/proizvodKontroler.js'
import { zastiti, admin } from '../middleware/authMiddleware.js'

const router = express.Router();


router.route('/').get(dohvatiProizvode).post(zastiti, admin, kreirajProizvod)
router.route('/:id').get(dohvatiProizvodePrekoID).delete(zastiti, admin, deleteProizvod).put(zastiti, admin, azurirajProizvod)


export default router