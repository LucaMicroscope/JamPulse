import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Pagina dedicata alla creazione di un nuovo post.
// Questa vista rappresenta il punto di ingresso per pubblicare contenuti multimediali
// e permette all'utente di inserire una descrizione e allegare un'immagine.
// Il componente è pensato come una schermata semplice ma chiara, pronta per essere evoluta
// con validazione, preview dell'immagine e invio reale al backend.
export default function CreatePost() {
    return (
        // Contenitore principale della pagina: centra il form verticalmente e orizzontalmente.
        // Ho usato Stack perché la pagina è organizzata in una singola colonna con allineamento semplice
        // e con la necessità di gestire facilmente lo spazio interno e il centraggio dei contenuti.
        <Stack sx={{ border: 'solid', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {/* Card che racchiude il form principale e gli dà un aspetto più "schermata di creazione".
                La Card è utile qui perché separa visivamente il contenuto dall'ambiente circostante,
                aggiungendo un box con bordi arrotondati e padding dedicato ai campi. */}
            <Card sx={{ width: '80%', borderRadius: 5, padding: 5 }}>
                <form>
                    {/* Stack verticale per organizzare gli elementi del form in sequenza.
                        Lo spazio tra i campi è stato aumentato per migliorare la leggibilità e l'esperienza utente. */}
                    <Stack spacing={5}>
                        {/* Titolo della schermata: indica chiaramente l'obiettivo dell'azione. */}
                        <Typography variant="h5" align="center">
                            Crea un nuovo post
                        </Typography>

                        {/* Campo dedicato alla descrizione del post.
                            È un TextField multiline con più righe visibili perché la descrizione può essere abbastanza lunga.
                            Il flag required segnala che il contenuto è necessario prima dell'invio. */}
                        <TextField
                            label="Scrivi la descrizione del post"
                            multiline
                            minRows={4}
                            fullWidth
                            required
                        />

                        {/* Pulsante per caricare un'immagine.
                            Il componente è reso come label per poter aprire il file input nascosto
                            e mantenere l'interfaccia pulita e intuitiva. */}
                        <Button variant="outlined" component='label' startIcon={<CloudUploadIcon />}>
                            Carica la foto
                            <input
                                type="file"
                                hidden
                                accept="image/png, image/jpeg"
                                required
                            />
                        </Button>

                        {/* Pulsante di invio del form.
                            In questa versione è solo il punto di partenza visivo; in futuro verrà collegato
                            alla logica di pubblicazione e al salvataggio su backend. */}
                        <Button type="submit" variant="contained" size="large">
                            Condividi il post
                        </Button>
                    </Stack>
                </form>
            </Card>
        </Stack>
    )
}