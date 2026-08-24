import { Stack, Avatar, Typography, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Componente riutilizzabile che mostra l'autore di un post in modo compatto e cliccabile.
// Usato principalmente in PostDetail per mostrare chi ha pubblicato il contenuto.
//
// ! MODIFICATO: prima usava dati hardcoded (username fisso, avatar fisso).
// Ora accetta due props:
//   - username (string): il nome dell'autore del post
//   - userId (string): l'ID dell'autore, usato per navigare al suo profilo al click
//
// Se le props non arrivano (es. durante il caricamento), mostra dei valori di fallback.
export default function UserBadge({ username, userId }) {
    const navigate = useNavigate();

    // Dimensione dell'avatar all'interno del badge.
    // Valore fisso per mantenere la UI uniforme.
    const avatarSize = 80;

    return (
        // ButtonBase rende l'intera area cliccabile.
        // Al click navighiamo al profilo dell'autore, se abbiamo il suo ID.
        <ButtonBase onClick={() => userId && navigate(`/profile/${userId}`)}>
            {/* Layout orizzontale: avatar + nome utente allineati al centro */}
            <Stack direction='row' spacing={3} sx={{ alignItems: 'center', justifyContent: 'center', paddingY: 1 }}>
                {/*
                    Avatar generato automaticamente dalle iniziali del nome utente
                    tramite il servizio ui-avatars.com, stesso approccio usato in PostCard.jsx.
                    Se username non è ancora disponibile, usiamo 'U' come fallback.
                */}
                <Avatar
                    alt={username || 'Utente'}
                    src={`https://ui-avatars.com/api/?name=${username || 'U'}`}
                    sx={{ width: avatarSize, height: avatarSize }}
                />
                {/* ! MODIFICATO: prima era "Username" hardcoded, ora mostra il nome reale */}
                <Typography variant="h6">{username || 'Caricamento...'}</Typography>
            </Stack>
        </ButtonBase>
    )
}
