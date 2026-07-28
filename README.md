# JamPulse

JamPulse è una Single Page Application (SPA) dedicata ai musicisti. L'obiettivo della piattaforma è permettere agli utenti di condividere la propria passione tramite post e di trovare altri musicisti in base allo strumento suonato e al genere musicale preferito, facilitando la creazione di nuove band tramite messaggistica in tempo reale.

## Stack Tecnologico

Il progetto rispetta i vincoli tecnologici richiesti per l'esame:

* **Frontend:** React con React Router per la navigazione client-side.
* **Stilizzazione:** Material UI o Tailwind CSS per un design responsive e moderno.
* **Backend:** Node.js con framework Express.
* **Database:** MongoDB ospitato in cloud (es. MongoDB Atlas).
* **Real-time:** Socket.IO per la gestione della chat e dei messaggi in tempo reale.
* **Autenticazione:** JSON Web Token (JWT) con hashing delle password tramite Bcrypt per garantire un accesso sicuro.

## Funzionalità Principali (Casi d'Uso)

1. **Gestione Profilo:** L'utente può registrarsi, effettuare il login e modificare il proprio profilo inserendo gli strumenti musicali suonati, i generi preferiti e una breve biografia.
2. **Bacheca / Feed (Post):** L'utente può scorrere una bacheca contenente i post degli altri iscritti (testo e/o elementi multimediali) e pubblicare i propri aggiornamenti.
3. **Ricerca Musicisti:** Una sezione dedicata ai filtri avanzati in cui è possibile cercare gli utenti della piattaforma filtrandoli per strumento e per genere musicale.
4. **Chat Real-Time:** Un sistema di messaggistica privata in tempo reale per contattare direttamente i musicisti trovati e organizzare sessioni di prova o formare una band.

---

## Architettura delle API (Endpoint)

Il backend esporrà una serie di API RESTful prefissate dal percorso `/api/v1`. Le rotte protette richiederanno il passaggio del token all'interno dell'header HTTP `Authorization: Bearer <token>`.

### Autenticazione (Auth)

| Metodo | Endpoint | Descrizione | Autenticazione |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Registrazione di un nuovo utente nel sistema. | No |
| `POST` | `/api/v1/auth/login` | Autenticazione dell'utente; restituisce il token JWT valido. | No |

### Utenti e Ricerca (Users)

| Metodo | Endpoint | Descrizione | Autenticazione |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/users/me` | Recupera i dettagli e i dati dell'utente attualmente loggato. | Sì |
| `PUT` | `/api/v1/users/me` | Aggiorna le informazioni del profilo (strumenti, generi, bio). | Sì |
| `GET` | `/api/v1/users` | Ricerca e filtra gli utenti registrati tramite query parameters (`?instrument=...&genre=...`). | Sì |
| `GET` | `/api/v1/users/:id` | Recupera il profilo pubblico di uno specifico utente tramite il suo ID. | Sì |
| `POST` | `/api/v1/users/:id/follow` | Permette di seguire un altro utente (aggiungendolo alla lista dei seguiti). | Sì |
| `POST` | `/api/v1/users/:id/unfollow` | Permette di smettere di seguire un utente precedentemente seguito. | Sì |

### Bacheca e Post (Posts)

| Metodo | Endpoint | Descrizione | Autenticazione |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/posts` | Recupera il feed generale contenente i post più recenti della community. | Sì |
| `POST` | `/api/v1/posts` | Crea e pubblica un nuovo post sulla bacheca. | Sì |
| `DELETE` | `/api/v1/posts/:id` | Consente l'eliminazione di un post esistente (solo se l'autore coincide con l'utente loggato). | Sì |

### Messaggistica e Chat (Chats)

*Nota: Gli endpoint seguenti servono per l'inizializzazione e il recupero dello storico. I messaggi istantanei verranno scambiati in tempo reale tramite gli eventi e le connessioni WebSocket gestite da Socket.IO.*

| Metodo | Endpoint | Descrizione | Autenticazione |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/chats` | Elenca tutte le conversazioni attive ed esistenti dell'utente connesso. | Sì |
| `POST` | `/api/v1/chats` | Inizializza una nuova sessione di chat con un altro utente. | Sì |
| `GET` | `/api/v1/chats/:id/messages` | Recupera la cronologia dei messaggi scambiati all'interno di una specifica chat. | Sì |

---

## Struttura del Progetto

Il progetto è organizzato nelle due sottocartelle principali `backend` e `frontend` per separare chiaramente la logica server dall'interfaccia utente:

```text
jampulse/
├── README.md
├── usecase.puml                  # Diagramma dei casi d'uso PlantUML
│
├── backend/                      # Server Node.js + Express
│   ├── .env.example              # Template variabili d'ambiente
│   ├── server.js                 # Entry point app Express e server Socket.IO
│   ├── package.json
│   ├── config/
│   │   └── db.js                 # Connessione a MongoDB Atlas
│   ├── controllers/              # Logica di business
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── postController.js
│   │   └── chatController.js
│   ├── middlewares/               # Middleware di autenticazione e gestione errori
│   │   ├── authMiddleware.js     # Verifica token JWT
│   │   └── errorMiddleware.js
│   ├── models/                   # Schemi Mongoose (MongoDB)
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Chat.js
│   │   └── Message.js
│   └── routes/                   # Definizione endpoint REST
│       ├── authRoutes.js
│       ├── userRoutes.js
│       ├── postRoutes.js
│       └── chatRoutes.js
│
└── frontend/                     # Application Single Page React
    ├── package.json
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.jsx              # Entry point React
        ├── App.jsx               # Routing principale (React Router)
        ├── components/           # Componenti UI riutilizzabili
        │   ├── Sidebar.jsx       # Navigation bar laterale fissa
        │   ├── PostCard.jsx      # Card visualizzazione post
        │   ├── UserCard.jsx      # Card profilo utente con tasti Segui/Messaggio
        │   └── ProtectedRoute.jsx
        ├── context/              # Stato globale dell'applicazione
        │   ├── AuthContext.jsx   # Gestione login e token JWT
        │   └── SocketContext.jsx # Gestione connessione Socket.IO
        ├── pages/                # Pagine principali della SPA
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Home.jsx          # Feed dei post
        │   ├── Search.jsx        # Ricerca filtrata e networking
        │   ├── Profile.jsx       # Profilo utente
        │   └── Chat.jsx          # Messaggistica real-time
        └── services/             # Client HTTP (Axios / Fetch)
            ├── api.js            # Istanza base con intercettore JWT
            ├── authService.js
            ├── userService.js
            └── postService.js

---

## Note per la documentazione e la consegna

Per soddisfare pienamente i criteri di valutazione dell'esame e le istruzioni di consegna del progetto, verranno inclusi:
* La documentazione interattiva delle API realizzata con Swagger UI.
* Il diagramma UML dei casi d'uso obbligatorio per descrivere formalmente lo scenario applicativo.
* La specifica e descrizione del modello logico dei dati (collezioni e schemi Mongoose).
