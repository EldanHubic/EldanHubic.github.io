import bcrypt from 'bcryptjs'

const korisnici = [
    {
        ime: "Eldan",
        email: "eldan@eldancommerce.com",
        password: bcrypt.hashSync("123456", 10),
        jeAdmin: true
    },
    {
        ime: "Korisnik1",
        email: "korisnik1@eldancommerce.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        ime: "Korisnik2",
        email: "korisnik2@eldancommerce.com",
        password: bcrypt.hashSync("123456", 10),
    }
]


export default korisnici