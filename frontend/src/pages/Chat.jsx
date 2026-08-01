import { Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

export default function Chat(){
    return(
        <Stack direction='row'>
            <Sidebar/>
            <Stack spacing={3}>
                <SearchBar/>
            </Stack>
        </Stack>
    )
}