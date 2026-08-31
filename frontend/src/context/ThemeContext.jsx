import { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// 1. Creiamo il contesto
const ColorModeContext = createContext();
export const useColorMode = () => useContext(ColorModeContext);

// 2. Definiamo le 2 palette: una per il tema chiaro e una per il tema scuro.
const lightPalette = {
    mode: 'light',
    primary: {
        main: '#02004d', // Blu classico
    },
    secondary: {
        main: '#037840', // Verde scuro
    },
    background: {
        default: '#f5f5f5', // Grigio chiarissimo per lo sfondo
        paper: '#ffffff',   // Bianco per le card e la sidebar
    },
    text: {
        primary: '#000000',
        secondary: '#494848',
    }
};

const darkPalette = {
    mode: 'dark',
    primary: {
        main: '#60A5FA', // Azzurro luminoso
    },
    secondary: {
        main: '#4ADE80', // Verde brillante
    },
    background: {
        default: '#02040A',
        paper: '#0A101D',
    },
    text: {
        primary: '#ffffff',
        secondary: '#aaaaaa',
    }
};

// 3. Componente Provider
export default function CustomThemeProvider({ children }) {
    const [mode, setMode] = useState('light');

    // Funzione per cambiare tema
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );

    // Creiamo il tema scegliendo l'oggetto giusto in base allo stato
    const theme = useMemo(
        () =>
            createTheme({
                palette: mode === 'light' ? lightPalette : darkPalette,
                shape: { borderRadius: 5 }
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}