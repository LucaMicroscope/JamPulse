import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

// Componente riutilizzabile per selezionare più opzioni da una lista.
// Viene utilizzato per filtrare elementi come strumenti musicali o altri valori multipli.
export default function MultiSelectFilter({ labelId, value, handleChange, label, options }) {
    return (
        <FormControl sx={{ width: '100%' }}>
            {/* Etichetta visualizzata sopra il campo di selezione. */}
            <InputLabel id={labelId}>{label}</InputLabel>

            {/* Select multipla che consente di scegliere più valori contemporaneamente. */}
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
