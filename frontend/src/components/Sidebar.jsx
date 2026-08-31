// 1. Librerie esterne (Routing)
import { NavLink, useNavigate } from "react-router-dom";
// 2. Componenti Material-UI Core
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, useTheme } from "@mui/material";
// 3. Icone Material-UI
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Luna
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sole
// 4. Context e Hook locali
import { useAuth } from "../context/AuthContext";
import { useColorMode } from "../context/ThemeContext";

// Definisce le voci della sidebar come un array di oggetti.
// Ogni voce contiene l'etichetta, l'icona e il percorso associato alla navigazione.
// Ho scelto questa struttura perché rende il menu facilmente espandibile e mantenibile.
const menuItems = [
  { label: "Home", icon: <HomeRoundedIcon />, path: '/' },
  { label: "Cerca", icon: <SearchIcon />, path: '/search' },
  { label: "Chat", icon: <ChatBubbleOutlineRoundedIcon />, path: '/chat' },
  { label: "Profilo", icon: <AccountBoxRoundedIcon />, path: '/profile' },
  { label: "Crea Post", icon: <CreateIcon />, path: '/create' }
];

// Larghezze del drawer per i breakpoint "xs" e "sm".
// Questi valori definiscono la larghezza della sidebar in base alla dimensione dello schermo.
const widthXs = 60;
const widthSm = 170;

// Componente principale della barra laterale dell'applicazione.
// Fornisce la navigazione principale e si adatta in base alla dimensione dello schermo.
export default function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme();
  const colorMode = useColorMode()

  const handleLogout = () => {
    logout()// Cancella user e token
    navigate('/login')// Riporta al login
  }

  return (
    // Drawer permanente posizionato a sinistra della pagina.
    // Ho usato un drawer fisso perché la navigazione deve restare disponibile durante la navigazione dell'app.
    <Drawer
      anchor="left"
      open={true}
      variant="permanent"
      sx={{
        width: { xs: widthXs, sm: widthSm },
        "& .MuiDrawer-paper": { width: { xs: widthXs, sm: widthSm } }
      }}
    >
      {/* Contenitore principale della sidebar con layout verticale e spazio tra le sezioni. */}
      <Stack sx={{ justifyContent: 'space-between', flexGrow: 1 }}>
        {/* Sezione superiore: brand o home link. */}
        <Stack sx={{ p: 1 }}>
          <NavLink
            to='/'
            style={{
              textDecoration: 'none'
            }}
          >
            {/* 1. LOGO ESTESO (Testo + Icona) - Visibile solo su schermi grandi (sm in su) */}
            <Box
              component="img"
              src={theme.palette.mode === 'dark' ? "/Logo/DesktopDark.png" : "/Logo/DesktopLight.png"}
              alt="JamPulse Logo"
              sx={{
                display: { xs: 'none', sm: 'block' },
                width: '100%'
              }}
            />

            {/* 2. LOGO RIDOTTO (Solo J) - Visibile solo su smartphone (xs) */}
            <Box
              component="img"
              src={theme.palette.mode === 'dark' ? "/Logo/MobileDark.png" : "/Logo/MobileLight.png"}
              alt="JamPulse Logo Icon"
              sx={{
                display: { xs: 'block', sm: 'none' },
                width: '100%'
              }}
            />
          </NavLink>
        </Stack>

        {/* Sezione centrale: elenco delle voci di navigazione. */}
        <Stack>
          <List>
            {/* Crea un pulsante per ogni voce del menu. */}
            {menuItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.label}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? theme.palette.secondary.main : theme.palette.primary.main
                })}
              >
                <ListItemButton sx={{ justifyContent: 'center' }}>
                  {/* Icona centrata all'interno del bottone. */}
                  <ListItemIcon sx={{ justifyContent: 'center', color: 'inherit' }}>{item.icon}</ListItemIcon>
                  {/* Mostra il testo solo su schermi medi e grandi. */}
                  <ListItemText
                    primary={item.label}
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  />
                </ListItemButton>
              </NavLink>
            ))}
          </List>
        </Stack>

        {/* Sezione inferiore: toggle tema e azione di logout. */}
        <Stack>
          <ListItemButton onClick={colorMode.toggleColorMode}>
            <ListItemIcon sx={{ color: 'inherit' }}>
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText sx={{ display: { xs: 'none', sm: 'block' } }}>
              {/* Cambiamo testo in base al tema attuale */}
              {theme.palette.mode === 'dark' ? 'Tema Chiaro' : 'Tema Scuro'}
            </ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon sx={{ color: 'inherit' }}><LogoutIcon /></ListItemIcon>
            <ListItemText sx={{ display: { xs: 'none', sm: 'block' } }}>Logout</ListItemText>
          </ListItemButton>
        </Stack>
      </Stack>
    </Drawer >
  );
}