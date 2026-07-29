import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PostCard() {
  return (
    // Contenitore principale della scheda del post
    <Card
      sx={{ flex: "1 1 300px", minWidth: 200, maxWidth: 500 }}
    >
      {/* Header della card con avatar e nome utente */}
      <CardHeader
        avatar={<Avatar src="" alt="UserAvatar" />}
        title="Nome Utente"
      />

      {/* Immagine principale del post */}
      <CardMedia
        component="img"
        height="220"
        image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80"
        alt="PostImage"
      />

      {/* Contenuto testuale del post */}
      <CardContent>
        <Typography variant="body1">Contenuto del post...</Typography>
      </CardContent>
    </Card>
  );
}