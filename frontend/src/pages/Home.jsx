import PostCard from "../components/PostCard";
import { Grid, Stack } from "@mui/material";

// Pagina principale dell'applicazione.
// Mostra il feed dei post in una disposizione a griglia fluida, pensata per essere semplice
// e immediatamente leggibile. La pagina è concepita come una raccolta di card ordinate in modo responsivo.
export default function Home() {
    return (
        // Feed dei post: i contenuti vengono organizzati in una riga che può andare a capo. 
        // Ho usato uno Stack con wrapping per creare una visualizzazione simile a una griglia fluida. 
            <Stack direction='row' spacing={3} useFlexGap sx={{flexWrap:'wrap', justifyContent:'center'}} >
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </Stack>

    )
}