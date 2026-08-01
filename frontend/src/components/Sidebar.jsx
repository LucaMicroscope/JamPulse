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

// Definisce le voci della sidebar come un array di oggetti.
// Ogni voce contiene l'etichetta e l'icona da visualizzare.
// Ho scelto questa struttura perché rende il menu facilmente espandibile e mantenibile.
const menuItems = [
  { label: "JamPulse", icon: <AppleIcon /> },
  { label: "Home", icon: <HomeRoundedIcon /> },
  { label: "Cerca", icon: <SearchIcon /> },
  { label: "Chat", icon: <ChatBubbleOutlineRoundedIcon /> },
  { label: "Profilo", icon: <AccountBoxRoundedIcon /> },
  { label: "Logout", icon: <LogoutIcon /> },
  { label: "Crea Post", icon: <CreateIcon /> },
];

// Larghezze del drawer per i breakpoint "xs" e "sm".
const widthXs = 60;
const widthSm = 160;

// Componente principale della barra laterale dell'applicazione.
// Fornisce la navigazione principale e si adatta in base alla dimensione dello schermo.
export default function Sidebar() {
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
      <List>
        {/* Crea un pulsante per ogni voce del menu. */}
        {menuItems.map((item) => (
          <ListItemButton key={item.label} sx={{ justifyContent: 'center' }}>
            {/* Icona centrata all'interno del bottone. */}
            <ListItemIcon sx={{ justifyContent: 'center' }}>{item.icon}</ListItemIcon>
            {/* Mostra il testo solo su schermi medi e grandi. */}
            <ListItemText
              primary={item.label}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}