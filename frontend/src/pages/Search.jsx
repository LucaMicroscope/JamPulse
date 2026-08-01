import { InputAdornment, Stack, TextField } from "@mui/material";
import Sidebar from "../components/Sidebar";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import MultiSelectFilter from "../components/MultiSelectFilter";
import UserCard from "../components/UserCard";

// Elenco delle opzioni disponibili per il filtro degli strumenti musicali.
const instruments = ["Arpa", "Basso", "Batteria", "Chitarra", "Pianoforte", "Voce"];
// Elenco delle opzioni disponibili per il filtro dei generi musicali.
const genres = ["Rock", "Pop", "Jazz", "Blues", "Metal", "Funk", "Classica", "Hip Hop"];

// Pagina di ricerca degli utenti.
// Qui l'utente può cercare musicisti e filtrare i risultati in base a strumenti e generi musicali.
export default function Search() {
    // Stato che contiene gli strumenti selezionati dall'utente.
    const [instrument, setInstrument] = useState([]);
    // Stato che contiene i generi selezionati dall'utente.
    const [genre, setGenre] = useState([]);

    // Aggiorna lo stato degli strumenti ogni volta che l'utente modifica la selezione.
    const instrumentChange = (event) => {
        setInstrument(event.target.value);
    };

    // Aggiorna lo stato dei generi ogni volta che l'utente modifica la selezione.
    const genreChange = (event) => {
        setGenre(event.target.value);
    };

    return (
        <Stack direction='row'>
            {/* Sidebar laterale della pagina di ricerca. */}
            <Sidebar />

            <Stack>
                {/* Barra di ricerca e filtri multipli organizzati in una riga responsiva. */}
                {/* Ho usato uno Stack orizzontale con comportamento diverso in base alla dimensione dello schermo. */}
                <Stack direction={{ sm: 'column', md: 'row' }} spacing={1} sx={{ justifyContent: 'center', mb: 3 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Cerca"
                        sx={{ width: '100%' }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }
                        }}>
                    </TextField>

                    {/* Filtro per selezionare più strumenti musicali. */}
                    <MultiSelectFilter
                        labelId='instrument-select-label'
                        value={instrument}
                        handleChange={instrumentChange}
                        label='Strumenti Musicali'
                        options={instruments}
                    />

                    {/* Filtro per selezionare più generi musicali. */}
                    <MultiSelectFilter
                        labelId='genre-select-label'
                        value={genre}
                        handleChange={genreChange}
                        label='Generi Musicali'
                        options={genres}
                    />
                </Stack>

                {/* Area destinata ai risultati della ricerca. */}
                {/* Ho raggruppato le card in uno Stack con wrapping per ottenere un layout più flessibile. */}
                <Stack direction='row' spacing={3} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: 'center' }} >
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                </Stack>
            </Stack>
        </Stack>
    );
}