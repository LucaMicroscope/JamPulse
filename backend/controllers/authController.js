const User = require('../models/User')

async function register(req, res) {
    try {
        const { email, username, password, instruments, genres } = req.body

        const userExist = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (userExist)
            return res.status(400).json({ message: 'Email o Username già utilizzati' })

        const newUser = new User({ email, username, password, instruments, genres })
        await newUser.save()

    } catch (error) {

    }
}

function login(req, res) {
    res.json({ message: 'Rotta raggiunta con successo' })
}

module.exports = {
    register,
    login
}