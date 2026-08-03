import { Box, Divider, IconButton, Stack, TextField } from "@mui/material";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import UserBadge from "../components/UserBadge";
import SendIcon from '@mui/icons-material/Send';
import MessageBubble from "../components/MessageBubble";

// Pagina dedicata alla sezione chat dell'applicazione.
// Mostra una lista di contatti o conversazioni affiancata alla sidebar principale.
export default function Chat() {
    return (
        // Layout principale: sidebar laterale a sinistra e contenuto della chat a destra.
        <Stack direction='row'>
            <Sidebar />

            {/* Contenitore verticale della pagina chat. */}
            <Stack spacing={3}>
                {/* Barra di ricerca per trovare rapidamente una conversazione o un contatto. */}
                <SearchBar />

                {/* Lista dei badge utente organizzata con un separatore tra ogni elemento. */}
                <Stack divider={<Divider />}>
                    <UserBadge />
                    <UserBadge />
                    <UserBadge />
                    <UserBadge />
                </Stack>
            </Stack>
            <Stack sx={{ flexGrow: 1 }}>
                <UserBadge />
                <Divider />
                <Box sx={{ flexGrow: 1 }}>
                    <MessageBubble />
                </Box>
                <Stack direction='row' >
                    <TextField fullWidth size="small" placeholder="Scrivi un messaggio..." />
                    <IconButton>
                        <SendIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    )
}