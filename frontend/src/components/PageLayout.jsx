import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

// Layout condiviso per tutte le pagine dell'applicazione, tranne la pagina di login.
export default function PageLayout() {
    return (
        <Stack direction='row' spacing={1} sx={{ height: '100vh' }}>
            <Sidebar/>
            <Stack sx={{ flexGrow: 1 }}>
                <Outlet />
            </Stack>
        </Stack>
    )
}