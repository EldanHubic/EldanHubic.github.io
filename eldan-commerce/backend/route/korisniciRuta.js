import express from 'express'
import { authKorisnik, getProfilKorisnika, registrirajKorisnika, updateProfilKorisnika, getSviKorisnici, deleteKorisnika, updateKorisnika, getKorisnikaById } from '../kontroleri/korisniciKontroler.js'
import { zastiti, admin } from '../middleware/authMiddleware.js'

const router = express.Router();



router.route('/').post(registrirajKorisnika).get(zastiti, admin, getSviKorisnici)
router.post('/login', authKorisnik)
router.route('/profil').get(zastiti, getProfilKorisnika).put(zastiti, updateProfilKorisnika)
router.route('/:id').delete(zastiti, admin, deleteKorisnika).get(zastiti, admin, getKorisnikaById).put(zastiti, admin, updateKorisnika)


export default router 