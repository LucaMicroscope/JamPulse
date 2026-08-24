// ! MODIFICATO: aggiunti useState, useEffect, useParams per rendere la pagina dinamica.
// Prima tutto era hardcoded (immagine fissa, commenti finti, utente finto).
// Ora carichiamo i dati reali dal backend usando l'ID del post che arriva dall'URL.
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Avatar, Box, CircularProgress, Divider, List, ListItem,
    ListItemAvatar, ListItemText, Stack, Typography, TextField, IconButton
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import UserBadge from "../components/UserBadge";
import SendIcon from '@mui/icons-material/Send';
import { getPostById } from "../services/postServices";
import { getComments, createComment } from "../services/commentServices";
import { useAuth } from "../context/AuthContext";

// Pagina di dettaglio di un singolo post.
// L'ID del post viene letto dall'URL (es. /posts/abc123) tramite useParams.
//
// Struttura principale:
// - area sinistra: immagine del post (se presente)
// - area destra: autore (UserBadge), descrizione, lista commenti, input nuovo commento
export default function PostDetail() {
    // ! NUOVO: leggiamo l'ID del post dall'URL (parametro :id definito in App.jsx)
    const { id } = useParams();

    // ! NUOVO: utente loggato, ci serve per inviare commenti e mostrare l'avatar di chi commenta
    const { user } = useAuth();

    // ! NUOVO: stato per i dati del post (immagine, descrizione, autore...)
    const [post, setPost] = useState(null);

    // ! NUOVO: stato per la lista dei commenti del post
    const [comments, setComments] = useState([]);

    // ! NUOVO: testo attualmente scritto nel campo "Scrivi un commento..."
    const [commentText, setCommentText] = useState('');

    // ! NUOVO: spinner durante il caricamento del post
    const [loading, setLoading] = useState(true);

    // ! NUOVO: messaggio di errore se qualcosa va storto
    const [error, setError] = useState(null);

    // ! NUOVO: al montaggio del componente (o quando cambia l'ID nell'URL)
    // carichiamo il post e i suoi commenti dal backend in parallelo con Promise.all.
    // Promise.all aspetta che ENTRAMBE le chiamate finiscano prima di aggiornare lo stato,
    // così evitiamo render parziali con dati a metà.
    useEffect(() => {
        async function loadPostAndComments() {
            try {
                setLoading(true);
                // Eseguiamo le due chiamate in parallelo per risparmiare tempo
                const [postData, commentsData] = await Promise.all([
                    getPostById(id),   // GET /api/v1/posts/:id
                    getComments(id)    // GET /api/v1/posts/:id/comments
                ]);
                setPost(postData);
                setComments(commentsData);
            } catch (err) {
                setError('Impossibile caricare il post. Riprova più tardi.');
                console.error('Errore nel caricamento del post:', err);
            } finally {
                setLoading(false);
            }
        }

        loadPostAndComments();
    }, [id]); // Rieseguiamo se l'ID cambia (es. navigazione tra post diversi)

    // ! NUOVO: funzione per inviare un nuovo commento.
    // Chiamata al click del bottone "Invia" o alla pressione di Invio.
    async function handleSendComment() {
        // Non inviamo commenti vuoti o composti solo da spazi
        if (!commentText.trim()) return;

        try {
            // POST /api/v1/posts/:id/comments — il backend aggiunge l'autore tramite il token JWT
            const newComment = await createComment(id, { text: commentText });

            // Aggiungiamo il nuovo commento in fondo alla lista senza ricaricare tutto
            setComments(prev => [...prev, newComment]);

            // Puliamo il campo di input dopo l'invio
            setCommentText('');
        } catch (err) {
            console.error('Errore nell\'invio del commento:', err);
        }
    }

    // Mostriamo uno spinner mentre carichiamo i dati
    if (loading) {
        return (
            <Stack sx={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                <CircularProgress />
            </Stack>
        );
    }

    // Mostriamo un errore se il caricamento è fallito
    if (error || !post) {
        return (
            <Stack sx={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                <Typography color="error">{error || 'Post non trovato.'}</Typography>
            </Stack>
        );
    }

    return (
        // Area principale del dettaglio post: immagine + colonna delle informazioni.
        <Stack
            direction='row'
            spacing={2}
            sx={{
                flexGrow: 1,
                backgroundColor: 'lightgray',
                borderRadius: 8,
                maxHeight: '90vh',
                overflow: 'hidden'
            }}
        >
            {/*
                Immagine del post: occupa circa metà della larghezza disponibile.
                ! MODIFICATO: prima era un'immagine fissa di Unsplash hardcoded.
                Ora mostriamo post.media (URL reale salvato nel DB).
                Se il post non ha immagine (post.media è stringa vuota), mostriamo
                un placeholder grigio per mantenere il layout bicolonna.
            */}
            {post.media ? (
                <Box
                    component='img'
                    src={post.media}
                    alt="Immagine del post"
                    sx={{
                        width: '50%',
                        objectFit: 'cover'
                    }}
                />
            ) : (
                // Placeholder quando il post non ha immagine
                <Box
                    sx={{
                        width: '50%',
                        backgroundColor: '#ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography color="text.secondary">Nessuna immagine</Typography>
                </Box>
            )}

            {/* Colonna destra: badge autore, descrizione, lista commenti e input per nuovi commenti */}
            <Stack sx={{ alignItems: 'start', justifyContent: 'space-between', width: '50%' }}>
                {/*
                    ! MODIFICATO: prima UserBadge non accettava props e mostrava dati finti.
                    Ora passiamo username e userId del vero autore del post,
                    così il badge è cliccabile e porta al profilo corretto.
                    post.userID viene popolato dal backend con .populate('userID', 'username').
                */}
                <UserBadge
                    username={post.userID?.username}
                    userId={post.userID?._id}
                />

                {/*
                    Descrizione del post: testo libero inserito dall'autore.
                    ! MODIFICATO: prima era testo hardcoded, ora è post.content reale.
                */}
                <Typography variant="body1" sx={{ padding: 1 }}>
                    {post.content}
                </Typography>

                {/*
                    Lista dei commenti:
                    - Uso List per avere una struttura semantica e accessibile
                    - overflowY: 'auto' mantiene la lista scrollabile senza espandere l'altezza
                    - Ogni elemento è una ListItem con avatar e testo (autore + contenuto)
                    
                    ! MODIFICATO: prima c'era un array di commenti mock hardcoded.
                    Ora mappiamo i commenti reali arrivati dal backend.
                    Se non ci sono commenti, mostriamo un messaggio invitante.
                */}
                <List sx={{ width: '99%', overflowY: 'auto', flexGrow: 1 }}>
                    {comments.length > 0
                        ? comments.map((comment) => (
                            <ListItem key={comment._id} alignItems="start">
                                <ListItemAvatar>
                                    {/*
                                        Avatar del commentatore generato dalle sue iniziali.
                                        comment.userID viene popolato dal backend con username.
                                    */}
                                    <Avatar
                                        src={`https://ui-avatars.com/api/?name=${comment.userID?.username || 'U'}`}
                                        alt={comment.userID?.username}
                                    />
                                </ListItemAvatar>
                                {/* ! MODIFICATO: prima erano author e text hardcoded, ora sono dati reali */}
                                <ListItemText
                                    primary={comment.userID?.username || 'Utente'}
                                    secondary={comment.text}
                                />
                            </ListItem>
                        ))
                        : (
                            <Typography variant="body2" color="text.secondary" sx={{ padding: 2 }}>
                                Nessun commento ancora. Sii il primo a commentare!
                            </Typography>
                        )
                    }
                </List>

                {/*
                    Input per aggiungere un nuovo commento:
                    - TextField per l'input testuale, controllato dallo stato commentText
                    - IconButton con SendIcon per inviare il commento
                    
                    ! MODIFICATO: prima era puramente decorativo (nessun handler).
                    Ora è collegato allo stato e alla funzione handleSendComment.
                    Supporta anche l'invio tramite il tasto Invio (Enter).
                */}
                <Stack
                    direction='row'
                    sx={{ width: '100%', padding: 1, alignSelf: 'center', borderTop: 'thin solid' }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Scrivi un commento..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        // Invia il commento alla pressione di Invio (senza Shift)
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendComment();
                            }
                        }}
                    />
                    <IconButton onClick={handleSendComment} disabled={!commentText.trim()}>
                        <SendIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    )
}
