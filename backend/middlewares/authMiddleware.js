const jwt = require('jsonwebtoken')

//funzione da chiamare prima delle rotte protette,
// per verificare i token jwt
function verifyToken(req, res, next) {
    let token = null
    const authHeader = req.headers.authorization
    //controlliamo se l'authorization Header esiste e inizia con "Bearer "
    if (authHeader && authHeader.startsWith("Bearer "))
        //estraiamo il token e lo salviamo in token
        token = authHeader.split(" ")[1]
    if (!token)
        res.status(401).json({ message: 'Token mancante' })
    try {
        //Verifichiamo il token (che contiene l'ID utente)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //nella richiesta aggiungiamo l'id decodificato dalla verifica precedente
        req.user = { id: decoded.userId }
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token non valido' })
    }
}

module.exports = verifyToken