import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// Componente che rappresenta una singola scheda di post.
// Viene usato per mostrare i contenuti condivisi dagli utenti all'interno del feed.
export default function PostCard() {
  return (
    // Card principale del post: contiene avatar, immagine e testo descrittivo.
    <Card sx={{ width: 370 }}>
      {/* Header della card con avatar e nome utente. */}
      <CardHeader
        avatar={
          <Avatar
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            alt="UserAvatar"
          />
        }
        title="Nome Utente"
      />

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
    </Card>
  );
}