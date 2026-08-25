// Importiamo il modello Chat
const Chat = require('../models/Chat')

// GET /chats
// Restituisce tutte le conversazioni a cui partecipa l'utente loggato.
// Verrà usata per riempire la colonna di sinistra nella pagina Chat.
async function getChats(req, res) {
    try {
        // Cerchiamo tutte le chat dove l'ID dell'utente loggato (req.user.id) 
        // è presente all'interno dell'array "participants"
        const chats = await Chat.find({
            participants: { $in: [req.user.id] }
        })
            // Popoliamo i partecipanti. Ci serve l'username (e volendo l'avatar) per 
            // mostrare il nome dell'altra persona nel badge della sidebar.
            .populate('participants', 'username')
            // Ordiniamo le chat in base all'ultimo aggiornamento, così le conversazioni 
            // più recenti o con messaggi nuovi compaiono in cima alla lista.
            .sort({ updatedAt: -1 })

        res.json(chats)
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recupero delle chat', error })
    }
}

// POST /chats
// Crea una nuova conversazione con un utente, o restituisce quella già esistente.
// Il client (frontend) deve inviarci l'ID della persona con cui vogliamo chattare.
async function createChat(req, res) {
    try {
        // Estraiamo l'ID del destinatario dal body della richiesta
        const { targetUserId } = req.body

        if (!targetUserId)
            return res.status(400).json({ message: 'ID utente destinatario mancante' })

        // Preveniamo la creazione di una chat "fantasma" con se stessi
        if (req.user.id === targetUserId)
            return res.status(400).json({ message: 'Non puoi avviare una chat con te stesso' })

        // CONTROLLO DUPLICATI: Verifichiamo se esiste già una chat privata tra noi e l'altro utente.
        // $all indica che ENTRAMBI gli ID devono essere nell'array participants.        
        let chat = await Chat.findOne({
            participants: { $all: [req.user.id, targetUserId] }
        })

        // Se la chat esiste già, non la ricreiamo. Semplicemente la popoliamo e la restituiamo.
        if (chat) {
            await chat.populate('participants', 'username')
            return res.status(200).json(chat)
        }

        // Se non esiste nessuna chat, ne creiamo una nuova
        const newChat = await Chat.create({
            participants: [req.user.id, targetUserId]
        })

        // Popoliamo i dati dei partecipanti prima di inviare la risposta al frontend
        await newChat.populate('participants', 'username')

        // 201 Created indica che la risorsa è stata creata con successo
        res.status(201).json(newChat)
    } catch (error) {
        res.status(500).json({ message: 'Errore nella creazione della chat', error })
    }
}

module.exports = {
    getChats,
    createChat
}