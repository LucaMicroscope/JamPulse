import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// Ora è un componente "controlled": il valore è controllato dall'esterno.
// Search.jsx gli passa il testo corrente (value) e una funzione da chiamare
// quando l'utente digita (onChange). Questo permette a Search.jsx di usare
// il testo per filtrare la lista degli utenti.
export default function SearchBar({ value, onChange }) {
    return (
        <TextField
            variant="outlined"
            placeholder="Cerca"
            sx={{ width: '100%' }}
            // ! colleghiamo value e onChange al TextField.
            // value={value} → mostra il testo che gli passa il padre
            // onChange={onChange} → ogni volta che l'utente digita, chiama la funzione del padre
            value={value}
            onChange={onChange}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }
            }}
        />
    );
}
