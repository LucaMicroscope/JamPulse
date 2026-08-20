import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import AppleIcon from "@mui/icons-material/Apple";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import { NavLink } from "react-router-dom";
import { Icon, Stack, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
const widthSm = 160;

// Componente principale della barra laterale dell'applicazione.
// Fornisce la navigazione principale e si adatta in base alla dimensione dello schermo.
export default function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

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
        "& .MuiDrawer-paper": { width: { xs: widthXs, sm: widthSm } },
      }}
    >
      {/* Contenitore principale della sidebar con layout verticale e spazio tra le sezioni. */}
      <Stack sx={{ justifyContent: 'space-between', flexGrow: 1 }}>
        {/* Sezione superiore: brand o home link. */}
        <Stack>
          <NavLink
            to='/'
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <ListItemButton>
              <ListItemIcon><AppleIcon /></ListItemIcon>
              <ListItemText sx={{ display: { xs: 'none', sm: 'block' } }}>JamPulse</ListItemText>
            </ListItemButton>
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
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <ListItemButton sx={{ justifyContent: 'center' }}>
                  {/* Icona centrata all'interno del bottone. */}
                  <ListItemIcon sx={{ justifyContent: 'center' }}>{item.icon}</ListItemIcon>
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

        {/* Sezione inferiore: azione di logout. */}
        <Stack>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText sx={{ display: { xs: 'none', sm: 'block' } }}>Logout</ListItemText>
          </ListItemButton>
        </Stack>
      </Stack>
    </Drawer>
  );
}