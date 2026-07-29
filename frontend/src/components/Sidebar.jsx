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

// Definisce gli elementi della sidebar come dati, così è più semplice gestire la navigazione.
const menuItems = [
  { label: "JamPulse", icon: <AppleIcon /> },
  { label: "Home", icon: <HomeRoundedIcon /> },
  { label: "Cerca", icon: <SearchIcon /> },
  { label: "Chat", icon: <ChatBubbleOutlineRoundedIcon /> },
  { label: "Profilo", icon: <AccountBoxRoundedIcon /> },
];

// Componente principale della barra laterale dell'applicazione.
export default function Sidebar() {
  return (
    // Drawer permanente posizionato a sinistra della pagina.
    <Drawer anchor="left" open={true} variant="permanent">
      <List>
        {/* Renderizza ogni voce del menu tramite il mapping dell'array. */}
        {menuItems.map((item) => (
          <ListItemButton key={item.label}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}