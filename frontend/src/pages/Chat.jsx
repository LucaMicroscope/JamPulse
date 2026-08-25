import { useState, useEffect } from "react";
import { Box, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import UserBadge from "../components/UserBadge";
import SendIcon from '@mui/icons-material/Send';
import MessageBubble from "../components/MessageBubble";

// Importiamo gli hook e le chiamate API necessarie
import { useAuth } from "../context/AuthContext";
import { getChats } from "../services/chatServices";
import { getMessages, createMessage } from "../services/messageServices";

// Pagina dedicata alla sezione chat dell'applicazione.
// Qui l'utente può selezionare una conversazione, vedere i messaggi e inviarne di nuovi.
// La pagina è strutturata in tre blocchi principali: sidebar, lista conversazioni e area conversazione attiva.
export default function Chat() {
    // Recuperiamo l'utente loggato. Ci serve per capire quali messaggi
    // sono i "nostri" (isMine) e per escludere noi stessi dal nome della chat.
    const { user } = useAuth();
    // Definiamo gli stati (state) della nostra applicazione
    const [chats, setChats] = useState([]); // Lista di tutte le conversazioni a sinistra
    const [activeChat, setActiveChat] = useState(null); // La conversazione attualmente cliccata/aperta
    const [messages, setMessages] = useState([]); // I veri messaggi della conversazione aperta
    const [newMessageText, setNewMessageText] = useState(''); // Il testo in corso di digitazione nell'input

    // useEffect per caricare la lista delle chat all'apertura della pagina.
    // L'array di dipendenze vuoto [] significa: "Esegui questa funzione solo al primo render".
    useEffect(() => {
        async function loadChats() {
            try {
                const data = await getChats();
                setChats(data);
            } catch (error) {
                console.error("Errore nel caricamento delle chat:", error);
            }
        }
        loadChats();
    }, []);

    // Funzione helper per trovare "l'altra persona" nella chat.
    // Nel DB, participants è un array di 2 utenti. Per mostrare il nome 
    // giusto nella sidebar, dobbiamo trovare l'utente che NON sia quello loggato.
    const getOtherUser = (chat) => {
        // Se per qualche motivo manca l'utente o i partecipanti, ritorniamo null
        if (!user || !chat.participants) return null;
        // .find() restituisce il primo elemento che rispetta la condizione
        return chat.participants.find(p => (p._id) !== (user.id));
    }

    // Funzione che scatta quando clicchiamo su una chat nella sidebar.
    // Imposta la chat come "attiva" e va subito a scaricare i suoi messaggi dal server.
    const handleSelectChat = async (chat) => {
        setActiveChat(chat);
        try {
            const messages = await getMessages(chat._id);
            setMessages(messages);
        } catch (error) {
            console.error("Errore nel caricamento dei messaggi:", error);
        }
    };

    // Funzione per inviare un nuovo messaggio
    const handleSendMessage = async () => {
        // Evitiamo di inviare messaggi vuoti o se non c'è una chat attiva
        if (!newMessageText.trim() || !activeChat) return;

        try {
            // Chiamiamo il backend passando l'ID della chat e il contenuto.            
            const newMsg = await createMessage(activeChat._id, { content: newMessageText });

            // Aggiungiamo il nuovo messaggio alla lista attuale per vederlo apparire
            // istantaneamente a schermo senza dover ricaricare la pagina
            setMessages(prevMessages => [...prevMessages, newMsg]);

            // Ripuliamo la barra di testo
            setNewMessageText('');
        } catch (error) {
            console.error("Errore nell'invio del messaggio:", error);
        }
    };

    return (
        <Stack direction={"row"} sx={{ height: '100%' }}>
            {/* SIDEBAR: Lista delle conversazioni (320px fissa) */}
            <Stack spacing={3} sx={{ padding: 1, borderRight: 'thin groove', width: 320, flexShrink: 0 }}>
                {/* Barra di ricerca per trovare rapidamente una conversazione o un contatto. */}
                <SearchBar />

                {/* Mappiamo le chat ottenute dal backend.
                    Per ogni chat, stampiamo un UserBadge con i dati dell'altro utente. */}
                <Stack divider={<Divider />} sx={{ overflowY: 'auto' }}>
                    {chats.length > 0 ? (
                        chats.map((chat) => {
                            const otherUser = getOtherUser(chat);
                            return (
                                <Box
                                    key={chat._id}
                                    onClick={() => handleSelectChat(chat)}
                                    // Cambiamo leggermente il colore di sfondo se è la chat selezionata
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: activeChat?._id === chat._id ? 'action.hover' : 'transparent',
                                        borderRadius: 1
                                    }}
                                >
                                    <UserBadge
                                        username={otherUser?.username || "Utente Sconosciuto"}
                                        userId={otherUser?._id}
                                    />
                                </Box>
                            )
                        })
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                            Nessuna conversazione trovata.
                        </Typography>
                    )}
                </Stack>
            </Stack>

            {/* AREA PRINCIPALE: I messaggi della conversazione attiva */}
            <Stack sx={{ flexGrow: 1, height: '100%' }}>
                {activeChat ? (
                    <>
                        {/* HEADER: Chi è l'utente con cui stiamo chattando ora? */}
                        <Box sx={{ p: 1 }}>
                            <UserBadge
                                username={getOtherUser(activeChat)?.username || "Utente"}
                                userId={getOtherUser(activeChat)?._id}
                            />
                        </Box>
                        <Divider />

                        {/* Contenitore dei messaggi della conversazione.
                        Ho scelto Box invece di Stack perché il blocco dei messaggi deve crescere
                        in altezza in modo flessibile e supportare un overflow verticale senza
                        compromettere il layout del resto della pagina. */}
                        <Box sx={{ flexGrow: 1 }}>
                            {messages.length > 0 ? (
                                messages.map((message) => {
                                    // Verifichiamo se il mittente del messaggio (senderID) è l'utente loggato.                                    
                                    const isMine = (message.senderID?._id) === (user.id);
                                    return (
                                        <MessageBubble
                                            key={message._id}
                                            text={message.content}
                                            isMine={isMine}
                                        />
                                    );
                                })
                            ) : (
                                <Typography variant="body2" align="center" sx={{ mt: 5 }}>
                                    Inizia la conversazione! Manda il primo messaggio.
                                </Typography>
                            )}
                        </Box>


                        {/* Area di input per inviare un nuovo messaggio. */}
                        <Stack direction='row'>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Scrivi un messaggio..."
                                value={newMessageText}
                                onChange={(e) => setNewMessageText(e.target.value)}
                                // Se premo Invio, invio il messaggio
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <IconButton onClick={handleSendMessage} disabled={!newMessageText.trim()}>
                                <SendIcon />
                            </IconButton>
                        </Stack>
                    </>
                ) : (
                    // Se non c'è nessuna chat attiva (al primo caricamento della pagina)
                    <Stack sx={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Typography>
                            Seleziona una conversazione per iniziare a chattare
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Stack>
    )
}