import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import { Stack } from "@mui/material";

// Pagina principale dell'applicazione.
// Mostra la sidebar laterale e il feed dei post in una disposizione orizzontale.
export default function Home() {
    return (
        <Stack direction='row'>
            <Sidebar />

            {/* Feed dei post: i contenuti vengono organizzati in una riga che può andare a capo. */}
            {/* Ho usato uno Stack con wrapping per creare una visualizzazione simile a una griglia fluida. */}
            <Stack direction='row' spacing={3} useFlexGap sx={{flexWrap:'wrap', justifyContent:'center'}} >
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </Stack>
        </Stack>
    )
}