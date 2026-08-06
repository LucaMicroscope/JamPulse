import { Avatar, Button, Stack, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";

// Dimensione dell'avatar del profilo.
// Ho scelto di tenerla in una costante per evitare valori hard-coded sparsi nel componente
// e rendere più semplice eventuali modifiche future al layout.
const avatarSize = 300;

// Pagina del profilo utente.
// Mostra l'avatar, le informazioni principali e la lista dei post pubblicati dall'utente.
export default function Profile() {
    return (

        // Stack verticale principale del profilo: contiene tutte le sezioni della pagina in ordine logico.
        // Ho usato uno Stack in colonna perché gli elementi del profilo devono essere mostrati uno sotto l'altro: intro, azioni, post.
        <Stack spacing={3}>
            {/* Sezione superiore del profilo: unisce avatar e informazioni dell'utente. */}
            {/* Ho raggruppato questi elementi in uno Stack orizzontale perché l'immagine del profilo e i dati testuali devono apparire affiancati. */}
            <Stack direction='row' spacing={10} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                    alt="userAvatar"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
                    sx={{ width: avatarSize, height: avatarSize }} />

                {/* Blocco delle informazioni utente: raccoglie nome, biografia e dettagli musicali. */}
                {/* Ho usato uno Stack verticale perché queste informazioni sono correlate tra loro e vanno mostrate in colonna. */}
                <Stack spacing={3} sx={{ justifyContent: 'center', maxWidth: '50%' }} >
                    <Typography component='h1' variant='h3'>Username</Typography>
                    <Typography component='subtitle' variant='h6'>Bio dell'utente esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio </Typography>
                    <Typography component='subtitle' variant='h6'>Strumenti musicali: Chitarra, Basso</Typography>
                    <Typography component='subtitle' variant='h6'>Generi musicali: Rock, Pop</Typography>
                </Stack>
            </Stack>

            {/* Sezione delle azioni rapide: pulsanti per seguire e inviare un messaggio. */}
            {/* Ho messo questi bottoni in uno Stack orizzontale perché devono essere visualizzati affiancati e con uno spazio uniforme. */}
            <Stack direction='row' spacing={3} sx={{ justifyContent: 'center' }} >
                <Button variant="contained" sx={{ width: '40%' }}>Segui</Button>
                <Button variant="contained" sx={{ width: '40%' }}>Messaggio</Button>
            </Stack>

            {/* Sezione dei post dell'utente: mostra più card in modo ordinato e responsivo. */}
            {/* Ho usato uno Stack orizzontale con wrapping perché i post devono disporsi in griglia fluida, andando a capo se lo spazio è limitato. */}
            <Stack direction='row' spacing={3} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: 'center' }} >
                <PostCard />
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