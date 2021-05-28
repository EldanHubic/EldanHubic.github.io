import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const korisnikSchema = new mongoose.Schema({
    ime: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    jeAdmin: {
        type: Boolean,
        required: true,
        default: false
    }

}, {
    timestamps: true
})

korisnikSchema.methods.jednakiPasswordi = async function (uneseniPassword) {
    return await bcrypt.compare(uneseniPassword, this.password)
}

korisnikSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Korisnik = mongoose.model("Korisnik", korisnikSchema);


export default Korisnik