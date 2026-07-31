import { Box, InputAdornment, Stack, TextField } from "@mui/material";
import Sidebar from "../components/Sidebar";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import MultiSelectFilter from "../components/MultiSelectFilter";
import UserCard from "../components/UserCard";

// Elenco delle opzioni disponibili per il filtro degli strumenti musicali.
const instruments = ["Arpa", "Basso", "Batteria", "Chitarra", "Pianoforte", "Voce"];
// Elenco delle opzioni disponibili per il filtro dei generi musicali.
const genres = ["Rock", "Pop", "Jazz", "Blues", "Metal", "Funk", "Classica", "Hip Hop"];

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
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {/* Sidebar laterale della pagina di ricerca. */}
            <Sidebar />
            <Box sx={{flexGrow:1, margin: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Barra di ricerca e filtri multipli organizzati in una riga. */}
                    <Stack direction={{sm:'column',md:'row'}} spacing={1} sx={{justifyContent:'space-evenly'}}>
                        <TextField
                            variant="outlined"
                            placeholder="Cerca"
                            sx={{width:{sm:'100%',md:'33%'}}}
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
                    <Box sx={{mt:2,display: "flex", flexWrap: "wrap", justifyContent: 'start', gap: 5}}>
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}