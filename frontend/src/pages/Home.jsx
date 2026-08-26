import { CircularProgress, Stack, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/postServices"; // ! NUOVO: importiamo il service per i post

// Pagina principale: mostra il feed di tutti i post, dal più recente al più vecchio.
export default function Home() {

    // ! NUOVO: stato per la lista dei post arrivati dal backend
    const [posts, setPosts] = useState([]);

    // ! NUOVO: spinner mentre la chiamata è in corso
    const [loading, setLoading] = useState(true);

    // ! NUOVO: messaggio in caso di errore
    const [error, setError] = useState(null);

    // ! NUOVO: al montaggio del componente carichiamo i post dal backend.
    // Stesso pattern usato in Search.jsx per gli utenti.
    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await getPosts(); // GET /api/v1/posts
                setPosts(data);
            } catch (err) {
                setError('Impossibile caricare i post. Riprova più tardi.');
                console.error('Errore nel caricamento dei post:', err);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []); // [] = solo al montaggio

    if (loading) {
        return (
            <Stack sx={{ alignItems: 'center', mt: 10 }}>
                <CircularProgress />
            </Stack>
        );
    }

    if (error) {
        return (
            <Stack sx={{ alignItems: 'center', mt: 10 }}>
                <Typography color="error">{error}</Typography>
            </Stack>
        );
    }

    return (
        <Box
            sx={{
                display: 'grid',
                // 'auto-fill' crea colonne rigide da 370px.                 
                gridTemplateColumns: 'repeat(auto-fill, 370px)',
                gap: 3, // Spaziatura di 24px (uguale a spacing={3} dello Stack)
                justifyContent: 'center', // Centra l'intera griglia rispetto alla pagina,
                padding:2                
            }}
        >
            {/* ! MODIFICATO: prima c'erano 7 <PostCard /> hardcoded.
                Ora mappiamo i post reali arrivati dal backend.
                Se non ce ne sono ancora, mostriamo un messaggio. */}
            {posts.length > 0
                ? posts.map(post => (
                    /* ! MODIFICATO: onDelete rimuove il post eliminato dallo stato locale */
                    <PostCard
                        key={post._id}
                        post={post}
                        onDelete={(deletedId) => setPosts(prev => prev.filter(p => p._id !== deletedId))}
                    />
                ))
                : <Typography variant="body1" sx={{ mt: 5 }}>
                    Nessun post ancora. Sii il primo a pubblicare!
                </Typography>
            }
        </Box>
    );
}
