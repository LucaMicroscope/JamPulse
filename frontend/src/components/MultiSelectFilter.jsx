import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

// Componente riutilizzabile per selezionare più opzioni da una lista.
// Viene utilizzato per filtrare elementi come strumenti musicali o altri valori multipli.
// Ho scelto di renderizzarlo come componente separato per riutilizzarlo sia nella pagina di ricerca
// sia nella pagina di login, evitando duplicazione di codice.
export default function MultiSelectFilter({ labelId, value, handleChange, label, options }) {
    return (
        // FormControl contiene il campo di selezione e garantisce un layout ordinato e accessibile.
        <FormControl sx={{ width: '100%' }}>
            {/* Etichetta visualizzata sopra il campo di selezione. */}
            <InputLabel id={labelId}>{label}</InputLabel>

            {/* Select multipla che consente di scegliere più valori contemporaneamente. */}
            {/* Ho usato un controllo multiplo perché l'utente può selezionare più strumenti o generi contemporaneamente. */}
            <Select
                labelId={labelId}
                multiple
                value={value}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}>

                {/* Generazione dinamica delle opzioni disponibili nella lista. */}
                {options.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
