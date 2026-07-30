import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Stack, Typography } from "@mui/material";

// Dati di esempio utilizzati per visualizzare temporaneamente il profilo utente.
const username = 'Nome Utente';
const userInstruments = ['Chitarra', 'Basso'];
const userGenres = ['Rock', 'Metal'];

export default function UserCard() {
    return (
        <Card>
            {/* Area cliccabile che rappresenta il profilo dell'utente. */}
            <CardActionArea>
                {/* Header della card con il nome utente. */}
                <CardHeader title={username} />

                {/* Immagine profilo dell'utente. */}
                <CardMedia
                    component="img"
                    height="200"
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
                <Button variant="contained">Segui</Button>
                <Button variant="contained">Invia un messaggio</Button>
            </CardActions>
        </Card>
    );
}