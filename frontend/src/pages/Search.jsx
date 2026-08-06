import { Stack } from "@mui/material";
import { useState } from "react";
import MultiSelectFilter from "../components/MultiSelectFilter";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";

// Elenco delle opzioni disponibili per il filtro degli strumenti musicali.
const instruments = ["Arpa", "Basso", "Batteria", "Chitarra", "Pianoforte", "Voce"];
// Elenco delle opzioni disponibili per il filtro dei generi musicali.
const genres = ["Rock", "Pop", "Jazz", "Blues", "Metal", "Funk", "Classica", "Hip Hop"];

// Pagina di ricerca degli utenti.
// Qui l'utente può cercare musicisti e filtrare i risultati in base a strumenti e generi musicali.
// Ho organizzato la pagina in due blocchi principali: il controllo di ricerca e la sezione dei risultati.
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
        

            <Stack>
                {/* Barra di ricerca e filtri multipli organizzati in una riga responsiva.
                    Ho usato Stack perché i controlli devono essere allineati in modo semplice
                    e adattarsi a schermi diversi, passando da una colonna a una riga in base alla dimensione. */}
                <Stack direction={{ sm: 'column', md: 'row' }} spacing={1} sx={{ justifyContent: 'center', mb: 3 }}>
                    {/* Componente dedicato alla barra di ricerca testuale. */}
                    <SearchBar />

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

                {/* Area destinata ai risultati della ricerca.
                    Anche qui Stack è utile perché le card dei profili possono essere disposte in modo fluido,
                    andando a capo quando lo spazio è insufficiente e mantenendo una spaziatura uniforme. */}
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
        
    );
}