import { Button, Input, InputLabel, Stack, TextField } from "@mui/material";
import Sidebar from "../components/Sidebar";

export default function CreatePost() {
    return (
        <Stack direction='row' sx={{ height: '100vh' }}>
            <Sidebar />
            <Stack sx={{ flexGrow: 1, border: 'solid' }}>
                <form  >
                    <Stack direction='row'>
                        <InputLabel>Inserisci la descrizione del post:</InputLabel>
                        <TextField required />
                    </Stack>
                    <Stack direction='row'>
                        <InputLabel>Carica la foto:</InputLabel>
                        <input type="file" accept="image/png, image/jpeg" required/>
                    </Stack>
                    <Button type="submit" variant="contained">Condividi il post</Button>
                </form>
            </Stack>
        </Stack>
    )
}