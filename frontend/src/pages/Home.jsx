import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import { Stack } from "@mui/material";

export default function Home() {
    return (
        <Stack direction='row'>
            <Sidebar />
            <Stack direction='row' spacing={3} useFlexGap sx={{flexWrap:'wrap', justifyContent:'center'}} >
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </Stack>
        </Stack>


    )
}