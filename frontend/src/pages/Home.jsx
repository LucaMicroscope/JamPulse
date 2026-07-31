import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

export default function Home() {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", }}>
            <Sidebar />
            <Box sx={{margin:2, display: "flex", flexWrap: "wrap", justifyContent: 'start', gap: 5 }}>
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </Box>
        </Box>


    )
}