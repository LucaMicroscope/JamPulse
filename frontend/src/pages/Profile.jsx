// frontend/src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Button, CircularProgress, Stack, Typography } from "@mui/material";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import { getLoggedUser, getUserById, getPosts, follow, unfollow } from "../services/userServices";

// Dimensione dell'avatar del profilo.
// Ho scelto di tenerla in una costante per evitare valori hard-coded sparsi nel componente
// e rendere più semplice eventuali modifiche future al layout.
const avatarSize = 300;

// Pagina del profilo utente.
// Mostra l'avatar, le informazioni principali e la lista dei post pubblicati dall'utente.
// Funziona sia per il profilo proprio (/profile) che per quello altrui (/profile/:id).
export default function Profile() {

    // useParams legge i parametri dinamici dall'URL.
    // Se siamo su /profile/:id, id sarà l'ID dell'utente da visualizzare.
    // Se siamo su /profile (senza ID), id sarà undefined → stiamo guardando il nostro profilo.
    const { id } = useParams();

    // Dal contesto di autenticazione prendiamo l'utente attualmente loggato.
    // Serve per confrontare se il profilo visualizzato è il nostro oppure no.
    const { user: loggedUser } = useAuth();

    // Stato per i dati del profilo che stiamo visualizzando (potrebbe essere il nostro o di un altro utente)
    const [profileUser, setProfileUser] = useState(null);

    // Stato per i post dell'utente del profilo visualizzato
    const [posts, setPosts] = useState([]);

    // Stato per sapere se l'utente loggato sta già seguendo il profilo visualizzato.
    // Serve per mostrare "Segui" oppure "Smetti di seguire" sul bottone.
    const [isFollowing, setIsFollowing] = useState(false);

    // Stato per mostrare uno spinner mentre i dati vengono caricati dal backend
    const [loading, setLoading] = useState(true);

    // Calcoliamo se il profilo che stiamo guardando è il nostro:
    // - se non c'è un :id nell'URL → è il nostro profilo
    // - se c'è un :id ma coincide con il nostro → è sempre il nostro profilo
    const isOwnProfile = !id || id === loggedUser?._id;

    // useEffect si attiva ogni volta che cambia l'id nell'URL.
    // Questo permette di ricaricare i dati se navighi da un profilo all'altro
    // senza smontare e rimontare il componente.
    useEffect(() => {
        async function loadProfile() {
            setLoading(true);
            try {
                let user;

                if (isOwnProfile) {
                    // Siamo sul nostro profilo: usiamo getLoggedUser()
                    // che chiama GET /users/me, protetta dal nostro token JWT
                    user = await getLoggedUser();
                } else {
                    // Stiamo guardando il profilo altrui: usiamo getUserById(id)
                    // che chiama GET /users/:id
                    user = await getUserById(id);
                }

                setProfileUser(user);

                // Controlliamo se l'utente loggato è già tra i follower del profilo visualizzato.
                // user.followers è un array di ObjectId (che arrivano come stringhe dal JSON).
                // .some() ritorna true se almeno un elemento soddisfa la condizione.
                setIsFollowing(
                    user.followers?.some(followerId => followerId.toString() === loggedUser?._id) || false
                );

                // Carichiamo i post dell'utente tramite GET /users/:id/posts
                const userPosts = await getPosts(user._id);
                setPosts(userPosts);

            } catch (error) {
                console.error("Errore nel caricamento del profilo:", error);
            } finally {
                // finally si esegue sempre, sia in caso di successo che di errore.
                // Garantisce che lo spinner sparisca in ogni caso.
                setLoading(false);
            }
        }

        loadProfile();
    }, [id]); // Riesegui ogni volta che l'id nell'URL cambia

    // Funzione chiamata al click del bottone "Segui" / "Smetti di seguire"
    async function handleFollowToggle() {
        try {
            if (isFollowing) {
                await unfollow(profileUser._id);  // DELETE /users/:id/follow
                setIsFollowing(false);
            } else {
                await follow(profileUser._id);    // POST /users/:id/follow
                setIsFollowing(true);
            }
        } catch (error) {
            console.error("Errore nel follow/unfollow:", error);
        }
    }

    // Mentre carichiamo i dati, mostriamo uno spinner centrato nella pagina
    if (loading) {
        return (
            <Stack sx={{ alignItems: 'center', mt: 10 }}>
                <CircularProgress />
            </Stack>
        );
    }

    // Se i dati non sono arrivati (es. utente non trovato o errore di rete)
    if (!profileUser) {
        return <Typography>Utente non trovato.</Typography>;
    }

    return (

        // Stack verticale principale del profilo: contiene tutte le sezioni della pagina in ordine logico.
        // Ho usato uno Stack in colonna perché gli elementi del profilo devono essere mostrati uno sotto l'altro: intro, azioni, post.
        <Stack spacing={3}>
            {/* Sezione superiore del profilo: unisce avatar e informazioni dell'utente. */}
            {/* Ho raggruppato questi elementi in uno Stack orizzontale perché l'immagine del profilo e i dati testuali devono apparire affiancati. */}
            <Stack direction='row' spacing={10} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                    alt={profileUser.username}
                    // Per ora usiamo un avatar generato automaticamente dal nome utente.
                    // In futuro andrà qui l'URL dell'immagine profilo salvata nel database.
                    src={`https://ui-avatars.com/api/?name=${profileUser.username}&size=300`}
                    sx={{ width: avatarSize, height: avatarSize }} />

                {/* Blocco delle informazioni utente: raccoglie nome, biografia e dettagli musicali. */}
                {/* Ho usato uno Stack verticale perché queste informazioni sono correlate tra loro e vanno mostrate in colonna. */}
                <Stack spacing={3} sx={{ justifyContent: 'center', maxWidth: '50%' }}>
                    <Typography component='h1' variant='h3'>
                        {profileUser.username}
                    </Typography>
                    <Typography component='p' variant='h6'>
                        {/* Se bio è una stringa vuota (il default del modello), mostriamo un testo alternativo */}
                        {profileUser.bio || "Nessuna bio disponibile."}
                    </Typography>
                    <Typography component='p' variant='h6'>
                        {/* .join(', ') unisce l'array in una stringa leggibile: ["Chitarra", "Basso"] → "Chitarra, Basso" */}
                        Strumenti musicali: {profileUser.instruments.length > 0
                            ? profileUser.instruments.join(', ')
                            : "Non specificati"}
                    </Typography>
                    <Typography component='p' variant='h6'>
                        Generi musicali: {profileUser.genres.length > 0
                            ? profileUser.genres.join(', ')
                            : "Non specificati"}
                    </Typography>
                    <Typography component='p' variant='body1'>
                        {/* Contiamo quanti elementi ci sono negli array followers e following */}
                        {profileUser.followers.length} follower · {profileUser.following.length} seguiti
                    </Typography>
                </Stack>
            </Stack>

            {/* Sezione delle azioni rapide: visibile SOLO se stiamo guardando il profilo di un altro utente. */}
            {/* Sul nostro profilo non ha senso mostrare "Segui" o "Messaggio" a se stessi. */}
            {/* L'operatore && in JSX: se !isOwnProfile è true, renderizza il blocco; altrimenti non mostra nulla. */}
            {!isOwnProfile && (
                <Stack direction='row' spacing={3} sx={{ justifyContent: 'center' }}>
                    <Button
                        variant={isFollowing ? "outlined" : "contained"}
                        sx={{ width: '40%' }}
                        onClick={handleFollowToggle}
                    >
                        {/* Mostriamo testo diverso in base allo stato isFollowing */}
                        {isFollowing ? "Smetti di seguire" : "Segui"}
                    </Button>
                    <Button variant="contained" sx={{ width: '40%' }}>Messaggio</Button>
                </Stack>
            )}

            {/* Sezione dei post dell'utente: mostra più card in modo ordinato e responsivo. */}
            {/* Ho usato uno Stack orizzontale con wrapping perché i post devono disporsi in griglia fluida, andando a capo se lo spazio è limitato. */}
            <Stack direction='row' spacing={3} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                {posts.length > 0
                    ? posts.map(post => (
                        // key è obbligatorio in React quando mappi una lista:
                        // aiuta React a identificare quale elemento aggiornare senza rifare il render di tutti
                        <PostCard key={post._id} post={post} />
                    ))
                    : <Typography variant="body1">Nessun post ancora.</Typography>
                }
            </Stack>
        </Stack>
    );
}