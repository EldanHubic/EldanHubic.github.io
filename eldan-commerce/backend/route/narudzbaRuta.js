import express from 'express'
import { addNarudzbaProizvodi, getNarudzbaById, updateNarudzbaNaPlaceno, getMojeNarudzbe, getNarudzbe, updateNarudzbaNaDostavljeno } from '../kontroleri/narudzbaKontroler.js'
import { zastiti, admin } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').post(zastiti, addNarudzbaProizvodi).get(zastiti, admin, getNarudzbe)
router.route('/mojenarudzbe').get(zastiti, getMojeNarudzbe)
router.route('/:id').get(zastiti, getNarudzbaById)
router.route('/:id/plati').put(zastiti, updateNarudzbaNaPlaceno)
router.route('/:id/dostavi').put(zastiti, admin, updateNarudzbaNaDostavljeno)


export default router 