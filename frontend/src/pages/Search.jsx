import { CircularProgress, Stack, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import MultiSelectFilter from "../components/MultiSelectFilter";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import { getUsers } from "../services/userServices"; // !  importiamo la funzione che chiama GET /users

// Elenco delle opzioni disponibili per il filtro degli strumenti musicali.
const instruments = ["Arpa", "Basso", "Batteria", "Chitarra", "Pianoforte", "Voce"];
// Elenco delle opzioni disponibili per il filtro dei generi musicali.
const genres = ["Rock", "Pop", "Jazz", "Blues", "Metal", "Funk", "Classica", "Hip Hop"];

export default function Search() {

    // !  stato che contiene la lista completa degli utenti arrivata dal backend.
    // Partiamo con un array vuoto: prima che la chiamata finisca, non abbiamo ancora nessun utente.
    const [users, setUsers] = useState([]);

    // !  stato per mostrare lo spinner mentre aspettiamo la risposta del backend.
    const [loading, setLoading] = useState(true);

    // !  stato per gestire eventuali errori di rete o del server.
    const [error, setError] = useState(null);

    // Stato che contiene il testo digitato nella barra di ricerca.
    // !  prima era gestito solo dentro SearchBar, ora dobbiamo leggerlo qui
    // perché è Search.jsx a dover filtrare la lista utenti in base al testo.
    const [searchText, setSearchText] = useState('');

    // Stato che contiene gli strumenti selezionati dall'utente.
    const [instrument, setInstrument] = useState([]);

    // Stato che contiene i generi selezionati dall'utente.
    const [genre, setGenre] = useState([]);

    // ! useEffect esegue la funzione passata come primo argomento dopo il primo render.
    // L'array vuoto [] come secondo argomento significa "eseguila solo una volta",
    // cioè solo quando il componente viene montato (appare nella pagina per la prima volta).
    // È qui che facciamo la chiamata al backend per caricare tutti gli utenti.
    useEffect(() => {
        async function loadUsers() {
            try {
                // getUsers() chiama GET /api/v1/users e restituisce l'array di tutti gli utenti.
                // await aspetta che la Promise si risolva prima di andare avanti.
                const data = await getUsers();
                setUsers(data); // salviamo gli utenti nello stato
            } catch (err) {
                // Se la chiamata fallisce (es. backend giù, token scaduto), salviamo l'errore
                setError('Impossibile caricare gli utenti. Riprova più tardi.');
                console.error('Errore nel caricamento utenti:', err);
            } finally {
                // finally si esegue sempre, sia in caso di successo che di errore.
                // Garantisce che lo spinner sparisca in ogni caso.
                setLoading(false);
            }
        }

        loadUsers();
    }, []); // [] = esegui solo al montaggio, non ad ogni re-render

    // ! logica di filtraggio.
    // Invece di passare direttamente "users" alle UserCard, calcoliamo "filteredUsers":
    // una versione filtrata della lista completa, che cambia ogni volta che l'utente
    // modifica la ricerca o i filtri.
    //
    // NON usiamo un altro useState per i risultati filtrati: li calcoliamo direttamente
    // qui durante il render. Questo è un pattern React chiamato "derived state"
    // (stato derivato): se puoi calcolare un valore da altri stati esistenti, non serve
    // un nuovo stato — lo calcoli e basta. Aggiungere uno stato in più creerebbe
    // il rischio di avere dati non sincronizzati tra loro.
    const filteredUsers = users.filter(user => {

        // Filtro per testo: controlliamo se l'username contiene il testo cercato.
        // .toLowerCase() su entrambi rende la ricerca case-insensitive
        // (es. "mario" trova anche "Mario" o "MARIO").
        // .includes() restituisce true se la stringa contiene la sottostringa cercata.
        const matchesText = user.username.toLowerCase().includes(searchText.toLowerCase());

        // Filtro per strumenti: se l'utente non ha selezionato nessun filtro (array vuoto),
        // tutti gli utenti passano. Se invece ha selezionato degli strumenti,
        // mostriamo solo chi ne suona almeno uno tra quelli selezionati.
        //
        // instrument.length === 0 → nessun filtro attivo → l'utente passa
        // .some() restituisce true se almeno un elemento dell'array soddisfa la condizione.
        // Qui: "almeno uno degli strumenti selezionati è presente negli strumenti dell'utente"
        const matchesInstrument = instrument.length === 0 ||
            instrument.some(i => user.instruments.includes(i));

        // Filtro per generi: stessa logica degli strumenti.
        const matchesGenre = genre.length === 0 ||
            genre.some(g => user.genres.includes(g));

        // L'utente appare nei risultati SOLO se supera tutti e tre i filtri.
        // && (AND logico): tutti devono essere true.
        return matchesText && matchesInstrument && matchesGenre;
    });

    // Aggiorna lo stato degli strumenti ogni volta che l'utente modifica la selezione.
    const instrumentChange = (event) => {
        setInstrument(event.target.value);
    };

    // Aggiorna lo stato dei generi ogni volta che l'utente modifica la selezione.
    const genreChange = (event) => {
        setGenre(event.target.value);
    };

    // Mentre il backend risponde, mostriamo uno spinner
    if (loading) {
        return (
            <Stack sx={{ alignItems: 'center', mt: 10 }}>
                <CircularProgress />
            </Stack>
        );
    }

    // Se qualcosa è andato storto, mostriamo il messaggio di errore
    if (error) {
        return (
            <Stack sx={{ alignItems: 'center', mt: 10 }}>
                <Typography color="error">{error}</Typography>
            </Stack>
        );
    }

    return (
        <Stack sx={{padding:2}}>
            {/* Barra di ricerca e filtri */}
            <Stack direction={{ sm: 'column', md: 'row' }} spacing={1} sx={{ justifyContent: 'center', mb: 3 }}>

                {/* ! MODIFICATO: passiamo value e onChange a SearchBar
                    così Search.jsx controlla il testo digitato (controlled component).
                    Un "controlled component" è un input il cui valore è gestito dallo stato React,
                    non dal DOM. Questo ci permette di usare searchText nel filtro sopra. */}
                <SearchBar
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <MultiSelectFilter
                    labelId='instrument-select-label'
                    value={instrument}
                    handleChange={instrumentChange}
                    label='Strumenti Musicali'
                    options={instruments}
                />

                <MultiSelectFilter
                    labelId='genre-select-label'
                    value={genre}
                    handleChange={genreChange}
                    label='Generi Musicali'
                    options={genres}
                />
            </Stack>

            {/* Area risultati */}
            {/* Ho usato un Box con display: grid, per avere una tabella ordinata e centrata. Auto-fill rende la tabella responsiva */}
            <Box
                sx={{
                    display: 'grid',
                    // 'auto-fill' crea colonne rigide da 370px.                 
                    gridTemplateColumns: 'repeat(auto-fill, 370px)',
                    gap: 3, // Spaziatura di 24px (uguale a spacing={3} dello Stack)
                    justifyContent: 'center', // Centra l'intera griglia rispetto alla pagina                
                }}
            >
                {/* ! MODIFICATO: prima c'erano 7 <UserCard /> hardcoded senza dati.
                    Ora mappiamo filteredUsers (la lista filtrata) e per ogni utente
                    rendiamo una UserCard passandogli l'oggetto utente come prop.
                    
                    key={user._id}: come per gli strumenti in UserCard,
                    ogni elemento di una lista mappata deve avere una key univoca.
                    _id è l'identificatore univoco che MongoDB assegna ad ogni documento. */}
                {filteredUsers.length > 0
                    ? filteredUsers.map(user => (
                        <UserCard key={user._id} user={user} />
                    ))
                    : <Typography variant="body1" sx={{ mt: 5 }}>
                        Nessun utente trovato.
                    </Typography>
                }
            </Box>
        </Stack>
    );
}
