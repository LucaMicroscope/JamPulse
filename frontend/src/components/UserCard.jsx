import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Dati di esempio utilizzati per visualizzare temporaneamente il profilo utente.
// Li ho inseriti qui in modo da avere un mock rapido per la UI mentre la logica reale non è ancora implementata.
const username = 'Nome Utente';
const userInstruments = ['Chitarra', 'Basso'];
const userGenres = ['Rock', 'Metal'];

// Componente che rappresenta una scheda utente nella pagina di ricerca.
// Mostra informazioni essenziali come nome, strumenti e generi musicali, oltre a due azioni rapide.
export default function UserCard() {
    const navigate=useNavigate()
    return (
        <Card sx={{ width: 370 }}>
            {/* Area cliccabile che rappresenta il profilo dell'utente. */}
            {/* Ho usato CardActionArea per dare all'utente un'interazione immediata e un feedback visivo. */}
            <CardActionArea onClick={()=>navigate('/profile')}>
                {/* Header della card con il nome utente. */}
                <CardHeader title={username} />

                {/* Immagine profilo dell'utente. */}
                <CardMedia
                    component="img"                    
                    image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
                    alt="Profile Picture"                    
                />

                {/* Contenuto principale della scheda con strumenti e generi musicali. */}
                <CardContent>
                    <Typography>Suona:</Typography>
                    <Stack direction={"row"}>
                        {userInstruments.map((instrument) => (
                            <Typography key={instrument}>{instrument}</Typography>
                        ))}
                    </Stack>

                    <Typography>Generi:</Typography>
                    <Stack direction={"row"}>
                        {userGenres.map((genre) => (
                            <Typography key={genre}>{genre}</Typography>
                        ))}
                    </Stack>
                </CardContent>
            </CardActionArea>

            {/* Azioni disponibili nella scheda utente. */}
            <CardActions>
                <Button variant="contained" sx={{ width: '50%' }}>Segui</Button>
                <Button variant="contained" sx={{ width: '50%' }}>Scrivi</Button>
            </CardActions>
        </Card>
    );
}