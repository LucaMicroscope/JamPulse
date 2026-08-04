import { Box, ButtonBase, CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";



// Componente che rappresenta una singola scheda di post.
// Viene usato per mostrare i contenuti condivisi dagli utenti all'interno del feed.
// La card è stata progettata in modo da essere cliccabile sia nell'header che nel corpo,
// così l'utente può accedere rapidamente al profilo dell'autore oppure al dettaglio del post.
export default function PostCard() {
  // Hook di navigazione di React Router per spostare l'utente tra le pagine.
  const navigate = useNavigate();

  return (
    // Card principale del post: contiene avatar, immagine e testo descrittivo.
    <Card sx={{ width: 370 }}>
      {/* Header della card: cliccabile per aprire il profilo dell'utente autore del post. */}
      <CardActionArea onClick={() => navigate('/profile')}>
        <CardHeader
          avatar={
            <Avatar
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
              alt="UserAvatar"
            />
          }
          title="Nome Utente"
        />
      </CardActionArea>

      {/* Corpo della card: cliccabile per aprire la pagina di dettaglio del post. */}
      <CardActionArea onClick={() => navigate('/posts/1')}>
        {/* Immagine principale del post. */}
        <CardMedia
          component="img"
          height="220"
          image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80"
          alt="PostImage"
        />

        {/* Contenuto testuale del post. */}
        <CardContent>
          <Typography variant="body1">Contenuto del post...</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}