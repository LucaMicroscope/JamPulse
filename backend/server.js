
// * IMPORTIAMO LE VARIABILI D'AMBIENTE ----------------------------------------------------------------------------------------------------------------------------------------------------
require('dotenv').config();

// * IMPORTIAMO I MODULI NECESSARI -----------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const chatRoute = require('./routes/chatRoute');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const commentRoute= require('./routes/commentRoute')

// * CREIAMO L'APPLICAZIONE EXPRESS -----------------------------------------------------------------------------------------------------------------------------------------------------------
const app = express();

// * MIDDLEWARES ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.use(express.json()); // ! questo serve per utilizzare il middleware express.json() che permette di gestire le richieste con body in formato JSON

// * ROUTES --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.use((req, res, next) => { // !  questo serve per creare un middleware che stampa il path e il metodo della richiesta in arrivo per avere un log delle richieste in arrivo
  console.log(req.path, req.method);
  next(); 
});

app.use('/api/v1/auth', AuthRoute); // ! questo serve per utilizzare le rotte di autenticazione
app.use('/api/v1/chats', ChatRoute); // ! questo serve per utilizzare le rotte dei chat
app.use('/api/v1/posts', PostRoute); // ! questo serve per utilizzare le rotte dei post
app.use('/api/v1/users', UserRoute); // ! questo serve per utilizzare le rotte degli utenti
app.use('/api/v1/posts/:id/comments',commentRoute); // ! questo serve per utilizzare le rotte dei commenti

// * CONNESSIONE AL DATABASE E AVVIO DEL SERVER ----------------------------------------------------------------------------------------------------------------------------------------------
mongoose.connect(process.env.MONGO_URI) // ! questo serve per connettersi al database MongoDB utilizzando l'URI definito nelle variabili d'ambiente
    .then(() => { 
        // ! QUESTA PARTE DI CODICE NON È NECESSARIA, MA È UTILE PER TESTARE LA CONNESSIONE AL DATABASE
        app.listen(process.env.PORT, () => { // ! questo serve per far partire il server sulla porta definita nelle variabili d'ambiente
            console.log(`Server is running on port ${process.env.PORT} !!  CONFERMATO CHE LA CONNESSIONE AL DATABASE È STATA EFFETTUATA CON SUCCESSO !!`);
        })
    })
    .catch((error) => { // ! questa parte di codice serve per gestire eventuali errori nella connessione al database
        console.log(error);
    })