import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography, TextField, IconButton } from "@mui/material";
import Sidebar from "../components/Sidebar";
import UserBadge from "../components/UserBadge";
import SendIcon from '@mui/icons-material/Send';

// Dati di esempio per i commenti (mock). Nel backend questi verrebbero recuperati
// tramite una chiamata API; qui servono solo a illustrare il rendering della lista.
const comments = [
    { id: 1, author: "Marco Rossi", text: "Bellissimo post! Che chitarra stai suonando?" },
    { id: 2, author: "Giulia Bianchi", text: "Fantastico 🎸 Mi piacerebbe fare una jam session con te!" },
    { id: 3, author: "RockBand99", text: "Ottimo sound, continua così." },
    { id: 4, author: "Marco Rossi", text: "Bellissimo post! Che chitarra stai suonando?" },
    { id: 5, author: "Giulia Bianchi", text: "Fantastico 🎸 Mi piacerebbe fare una jam session con te!" },
    { id: 6, author: "RockBand99", text: "Ottimo sound, continua così." }
];

// Pagina di dettaglio di un singolo post.
// Struttura principale:
// - Stack orizzontale (row) che contiene la `Sidebar` e l'area principale del post;
// - l'area principale è divisa in immagine (sinistra) e colonna dei dettagli (destra).
export default function PostDetail() {
    return (
        <Stack direction='row'>
            {/* Sidebar: navigazione persistente, separata dal contenuto principale. */}
            <Sidebar />

            {/* Area principale del dettaglio post: immagine + colonna delle informazioni. */}
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
                {/* Immagine del post: occupa circa metà della larghezza disponibile. */}
                <Box
                    component='img'
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80"
                    alt="PostImage"
                    sx={{
                        width:'50%',
                        objectFit:'cover'
                    }}
                />

                {/* Colonna destra: badge utente, descrizione, lista commenti e input per nuovi commenti. */}
                <Stack sx={{ alignItems: 'start' }}>
                    {/* Badge utente (riutilizza il componente condiviso). */}
                    <UserBadge />

                    {/* Descrizione del post: testo libero che può essere multilinea. */}
                    <Typography variant="body1" sx={{ padding: 1 }}>
                        Descrizione del post esempio esempio esempio esempio esempio esempio esempio esempio esempio
                    </Typography>

                    {/*
                      Lista dei commenti:
                      - Uso `List` per avere una struttura semantica e accessibile;
                      - `overflowY: 'scroll'` mantiene la lista scrollabile senza espandere eccessivamente
                        l'altezza della colonna dei dettagli;
                      - Ogni elemento è una `ListItem` con avatar e testo (autore + contenuto).
                    */}
                    <List sx={{ width: '99%', overflowY: 'auto' }}>
                        {comments.map((comment) => (
                            <ListItem key={comment.id} alignItems="start">
                                <ListItemAvatar>
                                    {/* Avatar dell'autore; in produzione dovrebbe provenire dai dati utente. */}
                                    <Avatar src='https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' />
                                </ListItemAvatar>
                                <ListItemText primary={comment.author} secondary={comment.text} />
                            </ListItem>
                        ))}
                    </List>

                    {/*
                      Input per aggiungere un commento:
                      - `TextField` per l'input testuale;
                      - `IconButton` con `SendIcon` per inviare il commento.
                      In una versione completa verrebbe gestito lo stato del campo e la chiamata POST.
                    */}
                    <Stack direction='row' sx={{ width: '100%', padding: 1, alignSelf: 'center', borderTop:'thin solid' }}>
                        <TextField fullWidth size="small" placeholder="Scrivi un commento..." />
                        <IconButton>
                            <SendIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}