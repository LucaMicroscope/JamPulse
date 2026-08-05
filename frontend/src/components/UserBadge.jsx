import { Stack, Avatar, Typography, ButtonBase } from "@mui/material";

// Componente che rappresenta un singolo contatto o conversazione nella lista chat.
// Mostra avatar e nome utente in modo compatto e cliccabile.
export default function UserBadge() {
    // Dimensione dell'avatar all'interno del badge.
    // Ho scelto un valore fisso per mantenere la UI uniforme tra tutti i contatti.
    const avatarSize = 80;

    return (
        // ButtonBase rende l'intera area cliccabile e migliora l'esperienza interattiva.
        <ButtonBase>
            {/* Layout orizzontale con avatar e nome utente allineati verticalmente al centro. */}
            <Stack direction='row' spacing={3} sx={{ alignItems: 'center', justifyContent: 'center', paddingY:1 }}>
                <Avatar
                    alt="userAvatar"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
                    sx={{ width: avatarSize, height: avatarSize }} />
                <Typography variant="h6">Username</Typography>
            </Stack>
        </ButtonBase>
    )
}