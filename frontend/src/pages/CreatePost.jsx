import { Button, InputLabel, Stack, TextField } from "@mui/material";
import Sidebar from "../components/Sidebar";

// Pagina dedicata alla creazione di un nuovo post.
// Contiene il form con descrizione e upload della foto, pronto per essere ampliato con la logica reale di invio.
export default function CreatePost() {
    return (
        <Stack sx={{ flexGrow: 1, border: 'solid' }}>
            <form>
                <Stack direction='row'>
                    <InputLabel>Inserisci la descrizione del post:</InputLabel>
                    <TextField required />
                </Stack>
                <Stack direction='row'>
                    <InputLabel>Carica la foto:</InputLabel>
                    <input type="file" accept="image/png, image/jpeg" required />
                </Stack>
                <Button type="submit" variant="contained">Condividi il post</Button>
            </form>
        </Stack>
    )
}