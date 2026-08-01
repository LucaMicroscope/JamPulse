import { Divider, Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import UserBadge from "../components/UserBadge";

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
        </Stack>
    )
}