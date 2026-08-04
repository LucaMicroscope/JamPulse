import { Box, Stack, Typography, Tab, TextField, Button } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";
import MultiSelectFilter from "../components/MultiSelectFilter";

// Elenco delle opzioni disponibili per il filtro degli strumenti musicali.
const instruments = ["Arpa", "Basso", "Batteria", "Chitarra", "Pianoforte", "Voce"];
// Elenco delle opzioni disponibili per il filtro dei generi musicali.
const genres = ["Rock", "Pop", "Jazz", "Blues", "Metal", "Funk", "Classica", "Hip Hop"];

// Pagina di accesso e registrazione dell'applicazione.
// Qui vengono mostrati i due form principali e il passaggio tra le due modalità avviene tramite tab.
// La pagina è divisa in due blocchi: testo introduttivo a sinistra e form di autenticazione a destra.
export default function Login() {
    // Stato che controlla quale tab è attiva: accesso o registrazione.
    const [tabValue, setTabValue] = useState('1');

    // Aggiorna la tab attiva quando l'utente seleziona un'altra voce.
    const tabChange = (event, newValue) => {
        setTabValue(newValue)
    }
    //Variabili per il MultiSelectFilter (da sistemare perché duplicati da Search.jsx)
    // Stato che contiene gli strumenti selezionati dall'utente.
    const [instrument, setInstrument] = useState([]);
    // Stato che contiene i generi selezionati dall'utente nella fase di registrazione.
    const [genre, setGenre] = useState([]);

    // Aggiorna lo stato degli strumenti ogni volta che l'utente modifica la selezione.
    const instrumentChange = (event) => {
        setInstrument(event.target.value);
    };

    // Aggiorna lo stato dei generi ogni volta che l'utente modifica la selezione.
    const genreChange = (event) => {
        setGenre(event.target.value);
    };

    // Previene il comportamento predefinito del form di accesso.
    const handleLogin = (event) => {
        event.preventDefault();
    };

    // Previene il comportamento predefinito del form di registrazione.
    const handleRegister = (event) => {
        event.preventDefault();
    };

    return (
        // Box principale che contiene tutto il contenuto della pagina di accesso.
        // È usata come contenitore flessibile per organizzare il lato testo e il lato form.
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, height: '97vh' }}>
            {/* Stack verticale che contiene il testo introduttivo dell'applicazione. */}
            <Stack sx={{ width: '50%', justifyContent: 'center' }}>
                {/* Titolo principale della pagina. */}
                <Typography component='h1' variant='h2'>Benvenuto su JamPulse!</Typography>

                {/* Descrizione introduttiva dell'applicazione. */}
                <Typography component='h2' variant='h6'>
                    Connettiti con i musicisti intorno a te.
                    Che tu stia cercando la voce perfetta per la tua band,
                    un chitarrista per una jam session o semplicemente un posto dove condividere la tua musica,
                    JamPulse è il palco giusto per te.
                </Typography>
            </Stack>

            {/* Box sul lato destro che contiene il form di accesso e registrazione. */}
            <Box sx={{ width: '50%', alignContent: 'center' }}>
                {/* Contesto dei tab che gestisce lo stato attivo tra accesso e registrazione. */}
                <TabContext value={tabValue}>
                    {/* Box che contiene i tab di selezione tra accesso e registrazione. */}
                    <Box sx={{ justifyItems: 'center' }}>
                        <TabList onChange={tabChange}>
                            <Tab label='ACCEDI' value='1'></Tab>
                            <Tab label='REGISTRATI' value='2'></Tab>
                        </TabList>
                    </Box>

                    {/* Pannello dedicato al login. */}
                    <TabPanel value='1'>
                        <form onSubmit={handleLogin}>
                            {/* Stack verticale per impilare i campi del form con spazio uniforme. */}
                            <Stack spacing={2}>
                                <TextField fullWidth required label='Username'></TextField>
                                <TextField fullWidth required label='Password' type="password"></TextField>
                                <Button type="submit" variant="contained">Accedi</Button>
                            </Stack>
                        </form>
                    </TabPanel>

                    {/* Pannello dedicato alla registrazione. */}
                    <TabPanel value='2'>
                        <form onSubmit={handleRegister}>
                            {/* Stack verticale per organizzare i campi di registrazione in modo ordinato. */}
                            <Stack spacing={2}>
                                <TextField fullWidth required label='Email'></TextField>
                                <TextField fullWidth required label='Username'></TextField>
                                <TextField fullWidth required label='Password' type="password"></TextField>

                                {/* Selettore multiplo per scegliere gli strumenti musicali. */}
                                <MultiSelectFilter
                                    labelId='instrument-select-label'
                                    value={instrument}
                                    handleChange={instrumentChange}
                                    label='Strumenti Musicali'
                                    options={instruments}
                                />

                                {/* Selettore multiplo per scegliere i generi musicali. */}
                                <MultiSelectFilter
                                    labelId='genre-select-label'
                                    value={genre}
                                    handleChange={genreChange}
                                    label='Generi Musicali'
                                    options={genres}
                                />

                                <Button type="submit" variant="contained">Registrati</Button>
                            </Stack>
                        </form>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
}
