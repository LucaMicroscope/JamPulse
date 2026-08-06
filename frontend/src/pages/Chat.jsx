import { Box, Divider, IconButton, Stack, TextField } from "@mui/material";
import SearchBar from "../components/SearchBar";
import UserBadge from "../components/UserBadge";
import SendIcon from '@mui/icons-material/Send';
import MessageBubble from "../components/MessageBubble";

// Pagina dedicata alla sezione chat dell'applicazione.
// Qui l'utente può selezionare una conversazione, vedere i messaggi e inviarne di nuovi.
// La pagina è strutturata in tre blocchi principali: sidebar, lista conversazioni e area conversazione attiva.
export default function Chat() {
    // Dati mock usati temporaneamente per visualizzare una conversazione di esempio.
    const mockMessages = [
        { id: 1, text: "Ciao! Ho visto il tuo profilo, ti va di suonare insieme?", isMine: false },
        { id: 2, text: "Certo, mi farebbe molto piacere! Che strumenti suoni?", isMine: true },
        { id: 3, text: "Suono la chitarra elettrica, soprattutto rock e metal 🎸", isMine: false },
        { id: 4, text: "Perfetto, io suono il basso. Possiamo organizzare una jam session!", isMine: true },
    ];

    return (
        <Stack direction={"row"} sx={{ height: '100%' }}>
            <Stack spacing={3} sx={{ padding: 1, borderRight: 'thin groove', width: 320, flexShrink: 0 }}>
                {/* Barra di ricerca per trovare rapidamente una conversazione o un contatto. */}
                <SearchBar />

                {/* Lista dei badge utente con separatori tra gli elementi.
                    Questa sezione rappresenta la lista di conversazioni disponibili e
                    viene gestita come una colonna ordinata per mantenere i contatti leggibili. */}
                <Stack divider={<Divider />}>
                    <UserBadge />
                    <UserBadge />
                    <UserBadge />
                    <UserBadge />
                </Stack>
            </Stack>

            {/* Area principale della conversazione attiva.*/}
            <Stack sx={{ flexGrow: 1 }}>
                {/* Badge della conversazione attiva o titolo della chat. */}
                <UserBadge />
                <Divider />

                {/* Contenitore dei messaggi della conversazione.
                    Ho scelto Box invece di Stack perché il blocco dei messaggi deve crescere
                    in altezza in modo flessibile e supportare un overflow verticale senza
                    compromettere il layout del resto della pagina. */}
                <Box sx={{ flexGrow: 1 }}>
                    {mockMessages.map((message) =>
                        <MessageBubble key={message.id} text={message.text} isMine={message.isMine} />
                    )}
                </Box>

                {/* Area di input per inviare un nuovo messaggio. */}
                <Stack direction='row'>
                    <TextField fullWidth size="small" placeholder="Scrivi un messaggio..." />
                    <IconButton>
                        <SendIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    )
}