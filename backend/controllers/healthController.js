//Controller per il controllo dello stato di salute del server (Health Check).

//Questa funzione serve per verificare rapidamente se il backend è acceso e in grado di ricevere richieste.
function healthCheck(req, res) {
    res.json({ message: 'Server is OK' })
}

module.exports = {
    healthCheck
}