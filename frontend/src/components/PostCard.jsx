import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

// ! MODIFICATO: il componente ora accetta una prop "post".
// L'oggetto post ha questa forma (quella restituita dal backend con .populate):
// {
//   _id: "...",
//   content: "Testo del post",
//   media: "url_immagine oppure stringa vuota",
//   userID: { _id: "...", username: "Mario" },  ← grazie a .populate()
//   likes: [...],
//   createdAt: "..."
// }

// Piccola funzione di supporto per calcolare il tempo trascorso
// Converte la data del post in stringhe come "1h", "2d", "5m" 
function getTimeAgo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
}

export default function PostCard({ post }) {
    const navigate = useNavigate();

    return (
        <Card sx={{ width: 370 }}>
            {/* Header: cliccando si va al profilo dell'autore del post.
                post.userID._id è l'ID dell'autore, disponibile grazie al populate nel backend. */}
            <CardActionArea onClick={() => navigate(`/profile/${post.userID._id}`)}>
                <CardHeader
                    avatar={
                        // Avatar generato dal nome utente, stesso approccio di UserCard e Profile
                        <Avatar
                            src={`https://ui-avatars.com/api/?name=${post.userID.username}`}
                            alt={post.userID.username}
                        />
                    }
                    // ! MODIFICATO: prima era "Nome Utente" hardcoded, ora è il nome reale
                    title={
                        <Stack direction='row' sx={{justifyContent:'space-between'}}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {post.userID.username}
                            </Typography>
                            <Typography variant="body2">
                                {getTimeAgo(post.createdAt)}
                            </Typography>
                        </Stack>
                    }
                />
            </CardActionArea>

            {/* Corpo: cliccando si va alla pagina di dettaglio del post specifico.
                ! MODIFICATO: prima era hardcoded '/posts/1', ora usa l'ID reale del post */}
            <CardActionArea onClick={() => navigate(`/posts/${post._id}`)}>
                {/* Mostriamo l'immagine solo se il post ce l'ha (media non è stringa vuota).
                    L'operatore && in JSX: se la condizione a sinistra è truthy, renderizza
                    il componente a destra; altrimenti non mostra nulla. */}
                {post.media && (
                    <CardMedia
                        component="img"
                        height="220"
                        image={post.media}
                        alt="Immagine del post"
                    />
                )}

                <CardContent>
                    {/* ! MODIFICATO: prima era testo fisso, ora è il contenuto reale del post */}
                    <Typography variant="body1">{post.content}</Typography>

                    {/* Numero di like, se presenti */}
                    {post.likes?.length > 0 && (
                        <Typography variant="caption" color="text.secondary">
                            ❤️ {post.likes.length} {post.likes.length === 1 ? 'like' : 'like'}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
