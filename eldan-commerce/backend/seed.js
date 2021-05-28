import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Korisnik from './modeli/korisnikModel.js'
import Narudzba from './modeli/narudzbaModel.js'
import Proizvod from './modeli/proizvodModel.js'
import konektajDB from './config/db.js'
import korisnici from './config/korisnici.js'
import proizvodi from './podaci/proizvodi.js'
import colors from 'colors'

dotenv.config();
konektajDB();


const upisiPodatke = async () => {
    try {
        await Narudzba.deleteMany();
        await Proizvod.deleteMany();
        await Korisnik.deleteMany();

        const kreiraniKorisnici = await Korisnik.insertMany(korisnici);
        const adminKorisnik = kreiraniKorisnici[0]._id;

        const testniPodaci = proizvodi.map(proizvod => {
            return { ...proizvod, korisnik: adminKorisnik }
        })

        await Proizvod.insertMany(testniPodaci);
        console.log("Podaci importovani".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
}

const izbrisiPodatke = async () => {
    try {
        await Narudzba.deleteMany();
        await Proizvod.deleteMany();
        await Korisnik.deleteMany();


        console.log("Podaci izbrisani".red.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    izbrisiPodatke();
} else {
    upisiPodatke();
}