import { Box, Typography } from "@mui/material";

// Componente che rappresenta una singola bolla di messaggio nella chat.
// Differenzia i messaggi inviati dall'utente da quelli ricevuti attraverso colore e allineamento.
export default function MessageBubble({ text, isMine }) {
    return (
        <Box sx={{
            justifySelf: isMine ? 'end' : 'start',
            backgroundColor: isMine ? 'lightgreen' : 'lightgrey',
            padding: 2,
            margin: 1,
            borderRadius: 3,
            borderBottomRightRadius: isMine ? 0 : 8,
            borderBottomLeftRadius: isMine ? 8 : 0,
            maxWidth: '60%'
        }}>
            <Typography variant='body1'>{text}</Typography>
        </Box>
    )
}