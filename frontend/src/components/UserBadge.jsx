import { Stack, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Componente riutilizzabile che mostra avatar + nome utente di un partecipante.
//
// MODIFICATO:
//   - rimossa la navigazione dal contenitore (non più ButtonBase)
//   - solo l'Avatar è cliccabile e porta al profilo
//   - justifyContent cambiato da 'center' a 'flex-start' per allineare
//     il contenuto a sinistra all'interno del riquadro della sidebar
//
// Props:
//   - username (string): nome utente da mostrare
//   - userId (string): ID usato per navigare al profilo al click sull'avatar
export default function UserBadge({ username, userId }) {
    const navigate = useNavigate();

    const avatarSize = 48; // Ridotto da 80: più compatto nella sidebar della chat

    return (
        // width: '100%' fa occupare tutta la larghezza disponibile del padre,
        // così la riga si estende fino al bordo e il cestino si posiziona correttamente.
        // justifyContent: 'flex-start' allinea avatar e nome a sinistra.
        <Stack
            direction='row'
            spacing={2}
            sx={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingY: 1,
                paddingX: 1,
                width: '100%'
            }}
        >
            {/* Solo l'Avatar è cliccabile e naviga al profilo.
                stopPropagation impedisce che il click si propaghi al Box padre
                in Chat.jsx (che altrimenti aprirebbe la chat invece di navigare). */}
            <Avatar
                alt={username || 'Utente'}
                src={`https://ui-avatars.com/api/?name=${username || 'U'}`}
                sx={{
                    width: avatarSize,
                    height: avatarSize,
                    cursor: userId ? 'pointer' : 'default',
                    flexShrink: 0  // impedisce all'avatar di restringersi se il nome è lungo
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (userId) navigate(`/profile/${userId}`);
                }}
            />
            {/* Nome utente: testo semplice, non cliccabile.
                noWrap taglia con "..." se il nome è troppo lungo per la sidebar. */}
            <Typography variant="body1" noWrap>
                {username || 'Caricamento...'}
            </Typography>
        </Stack>
    );
}