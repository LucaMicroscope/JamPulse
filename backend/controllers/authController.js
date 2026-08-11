// Importiamo il modello Mongoose 'User' per poter interagire con la collezione degli utenti nel database
const User = require('../models/User')

// Questa funzione estrae i dati dal frontend, verifica che non ci siano duplicati 
// (email o username) nel database, crea un nuovo documento User e lo salva.
async function register(req, res) {
    try {
        // Estrazione delle variabili dall'oggetto req.body inviato dal frontend.
        const { email, username, password, instruments, genres } = req.body

        // Cerchiamo nel DB se esiste già un utente con questa email OPPURE questo username.
        const userExist = await User.findOne({
            $or: [{ email }, { username }]
        })

        // Se userExist contiene qualcosa (non è null), fermiamo l'esecuzione e restituiamo un errore 400 (Bad Request)
        if (userExist)
            return res.status(400).json({ message: 'Email o Username già utilizzati' })

        // Istanziamo un nuovo documento utente passando i dati ricevuti.        
        const newUser = new User({ email, username, password, instruments, genres })

        // Scriviamo fisicamente i dati su MongoDB.
        await newUser.save()

        // Restituiamo status 201 (Created) per confermare l'avvenuta creazione.
        res.status(201).json({
            message: 'Utente registrato correttamente',
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,                
                instruments: newUser.instruments,
                genres: newUser.genres
            }
        })

    } catch (error) {
        // Se Mongoose fallisce catturiamo l'errore e restituiamo un 500 (Internal Server Error)
        res.status(500).json({ message: 'Errore nella registrazione utente', error })
    }
}

function login(req, res) {
    res.json({ message: 'Rotta raggiunta con successo' })
}

module.exports = {
    register,
    login
}