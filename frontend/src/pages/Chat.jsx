import { useState, useEffect } from "react";
import { Box, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import UserBadge from "../components/UserBadge";
import SendIcon from '@mui/icons-material/Send';
import MessageBubble from "../components/MessageBubble";

// Importiamo gli hook e le chiamate API necessarie
import { useAuth } from "../context/AuthContext";
import { getChats, createChat } from "../services/chatServices";
import { getMessages, createMessage } from "../services/messageServices";
import { getFollowing } from "../services/userServices";

// Pagina dedicata alla sezione chat dell'applicazione.
// La sidebar sinistra mostra due sezioni:
//   1. Gli utenti che segui (puoi avviare o aprire una chat con loro)
//   2. Le chat arrivate da utenti che NON segui (stile "messaggi richiesta")
export default function Chat() {
    // Recuperiamo l'utente loggato dal contesto di autenticazione.
    // Ci serve per identificare quale parte del messaggio è "nostra"
    // e per escludere noi stessi dalla lista dei partecipanti.
    const { user } = useAuth();

    // --- STATI PRINCIPALI ---
    const [chats, setChats] = useState([]);         // Tutte le chat di cui siamo partecipanti (dal backend)
    const [following, setFollowing] = useState([]); // Gli utenti che seguiamo
    const [activeChat, setActiveChat] = useState(null);   // La conversazione attualmente aperta
    const [messages, setMessages] = useState([]);         // Messaggi della conversazione aperta
    const [newMessageText, setNewMessageText] = useState(''); // Testo in digitazione nell'input

    // Carichiamo sia le chat esistenti sia la lista dei following
    // all'apertura della pagina (array vuoto = esegui solo al primo render).
    useEffect(() => {
        async function loadData() {
            try {
                // Eseguiamo entrambe le chiamate in parallelo con Promise.all
                // per ridurre il tempo di attesa complessivo.
                const [chatsData, followingData] = await Promise.all([
                    getChats(),
                    getFollowing()
                ]);
                setChats(chatsData);
                setFollowing(followingData);
            } catch (error) {
                console.error("Errore nel caricamento dei dati iniziali:", error);
            }
        }
        loadData();
    }, []);

    // --- FUNZIONI HELPER ---

    // Trova "l'altra persona" in una chat a due partecipanti.
    // I participants arrivano già popolati (con _id e username) dal backend.
    const getOtherUser = (chat) => {
        if (!user || !chat.participants) return null;
        // .find() ritorna il primo elemento che soddisfa la condizione
        return chat.participants.find(p => p._id !== user.id);
    };

    // Controlla se un dato userId è tra gli utenti che seguiamo.
    // Ci serve per dividere le chat in "principali" e "richieste".
    const isFollowing = (userId) => {
        return following.some(f => f._id === userId);
    };

    // Gestisce il click su un utente che seguiamo ma con cui non abbiamo ancora una chat.
    // Chiama createChat sul backend: se la chat esiste già la riusa, altrimenti la crea.
    const handleSelectFollowing = async (followedUser) => {
        try {
            // createChat è già idempotente lato backend: se la chat esiste, la ritorna.
            const chat = await createChat({ targetUserId: followedUser._id });

            // Aggiorniamo la lista locale di chat se quella ritornata non c'era già
            setChats(prev => {
                const exists = prev.find(c => c._id === chat._id);
                return exists ? prev : [chat, ...prev];
            });

            // Apriamo subito la chat e carichiamo i messaggi
            await handleSelectChat(chat);
        } catch (error) {
            console.error("Errore nell'apertura della chat:", error);
        }
    };

    // Carica i messaggi di una chat e la imposta come attiva.
    const handleSelectChat = async (chat) => {
        setActiveChat(chat);
        try {
            const msgs = await getMessages(chat._id);
            setMessages(msgs);
        } catch (error) {
            console.error("Errore nel caricamento dei messaggi:", error);
        }
    };

    // Invia un nuovo messaggio nella chat attiva.
    const handleSendMessage = async () => {
        // Blocchiamo l'invio se il testo è vuoto o se non c'è una chat aperta
        if (!newMessageText.trim() || !activeChat) return;

        try {
            const newMsg = await createMessage(activeChat._id, { content: newMessageText });

            // Aggiorniamo la lista messaggi localmente per un'esperienza immediata,
            // senza dover ricaricare tutta la chat dal server.
            setMessages(prev => [...prev, newMsg]);

            // Puliamo il campo di testo dopo l'invio
            setNewMessageText('');
        } catch (error) {
            console.error("Errore nell'invio del messaggio:", error);
        }
    };

    // --- DIVISIONE CHAT: principali vs richieste ---

    // Le chat "principali" sono quelle dove l'altra persona è qualcuno che seguiamo.
    // Le mostriamo in cima perché sono contatti fidati.
    const mainChats = chats.filter(chat => {
        const other = getOtherUser(chat);
        return other && isFollowing(other._id);
    });

    // Le chat "richieste" sono quelle dove chi ha scritto NON è tra i nostri following.
    // Possono arrivare quando un utente non-seguito ci invia un messaggio per primo.
    const requestChats = chats.filter(chat => {
        const other = getOtherUser(chat);
        return other && !isFollowing(other._id);
    });

    // Costruiamo la lista degli utenti che seguiamo ma con cui NON abbiamo ancora
    // una chat aperta. Li mostriamo comunque per permettere di iniziare una conversazione.
    const followingWithoutChat = following.filter(f => {
        return !chats.some(chat => {
            const other = getOtherUser(chat);
            return other && other._id === f._id;
        });
    });

    // --- RENDERING ---
    return (
        <Stack direction={"row"} sx={{ height: '100%' }}>

            {/* SIDEBAR SINISTRA: Lista contatti e conversazioni (320px fissa) */}
            <Stack spacing={2} sx={{ padding: 1, borderRight: 'thin groove', width: 320, flexShrink: 0, overflowY: 'auto' }}>

                {/* Barra di ricerca per trovare rapidamente un contatto */}
                <SearchBar />

                {/* ------- SEZIONE 1: FOLLOWING (chat esistenti + contatti senza chat) ------- */}
                <Typography variant="caption" color="text.secondary" sx={{ px: 1, fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Messaggi
                </Typography>

                {/* Chat già esistenti con utenti che seguiamo */}
                <Stack divider={<Divider />}>
                    {mainChats.map((chat) => {
                        const otherUser = getOtherUser(chat);
                        return (
                            <Box
                                key={chat._id}
                                onClick={() => handleSelectChat(chat)}
                                sx={{
                                    cursor: 'pointer',
                                    // Evidenziamo la chat attiva con uno sfondo leggermente colorato
                                    backgroundColor: activeChat?._id === chat._id ? 'action.hover' : 'transparent',
                                    borderRadius: 1
                                }}
                            >
                                <UserBadge
                                    username={otherUser?.username || "Utente Sconosciuto"}
                                    userId={otherUser?._id}
                                />
                            </Box>
                        );
                    })}

                    {/* Following senza chat ancora aperta: cliccando si crea/apre la chat */}
                    {followingWithoutChat.map((followedUser) => (
                        <Box
                            key={followedUser._id}
                            onClick={() => handleSelectFollowing(followedUser)}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: 'transparent',
                                borderRadius: 1
                            }}
                        >
                            <UserBadge
                                username={followedUser.username}
                                userId={followedUser._id}
                            />
                        </Box>
                    ))}

                    {/* Messaggio di fallback se non seguiamo nessuno */}
                    {mainChats.length === 0 && followingWithoutChat.length === 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                            Non stai ancora seguendo nessuno.
                        </Typography>
                    )}
                </Stack>

                {/* ------- SEZIONE 2: RICHIESTE (messaggi da non-following) ------- */}
                {requestChats.length > 0 && (
                    <>
                        <Divider />
                        {/* Intestazione della sezione richieste */}
                        <Typography variant="caption" color="text.secondary" sx={{ px: 1, fontWeight: 'bold', textTransform: 'uppercase' }}>
                            Messaggi da account non seguiti
                        </Typography>

                        <Stack divider={<Divider />}>
                            {requestChats.map((chat) => {
                                const otherUser = getOtherUser(chat);
                                return (
                                    <Box
                                        key={chat._id}
                                        onClick={() => handleSelectChat(chat)}
                                        sx={{
                                            cursor: 'pointer',
                                            backgroundColor: activeChat?._id === chat._id ? 'action.hover' : 'transparent',
                                            borderRadius: 1,
                                            // Opacità ridotta per dare un senso visivo di "secondario"
                                            opacity: 0.75
                                        }}
                                    >
                                        <UserBadge
                                            username={otherUser?.username || "Utente Sconosciuto"}
                                            userId={otherUser?._id}
                                        />
                                    </Box>
                                );
                            })}
                        </Stack>
                    </>
                )}
            </Stack>

            {/* AREA PRINCIPALE DESTRA: Messaggi della conversazione attiva */}
            <Stack sx={{ flexGrow: 1, height: '100%' }}>
                {activeChat ? (
                    <>
                        {/* HEADER: Nome dell'utente con cui stiamo chattando */}
                        <Box sx={{ p: 1 }}>
                            <UserBadge
                                username={getOtherUser(activeChat)?.username || "Utente"}
                                userId={getOtherUser(activeChat)?._id}
                            />
                        </Box>
                        <Divider />

                        {/* AREA MESSAGGI: lista dei MessageBubble.
                            Usiamo Box invece di Stack perché flexGrow deve funzionare
                            correttamente con overflow verticale senza rompere il layout. */}
                        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                            {messages.length > 0 ? (
                                messages.map((message) => {
                                    // Confrontiamo l'ID del mittente con il nostro per sapere
                                    // se il messaggio è "nostro" (isMine) o dell'altro utente.
                                    const isMine = message.senderID?._id === user.id;
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

                        {/* INPUT: Campo di testo + pulsante invia */}
                        <Stack direction='row'>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Scrivi un messaggio..."
                                value={newMessageText}
                                onChange={(e) => setNewMessageText(e.target.value)}
                                // Invio con il tasto Enter (Shift+Enter va a capo senza inviare)
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
                    // Stato iniziale: nessuna chat selezionata
                    <Stack sx={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Typography>
                            Seleziona una conversazione per iniziare a chattare
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
}