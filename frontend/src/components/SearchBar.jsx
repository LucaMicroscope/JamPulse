import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// Componente dedicato alla barra di ricerca principale.
// È stato separato dalla pagina Search per rendere il codice più ordinato e riutilizzabile.
export default function SearchBar() {
    return (
        // Campo di testo con icona iniziale per indicare visivamente la funzione di ricerca.
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
    )
}