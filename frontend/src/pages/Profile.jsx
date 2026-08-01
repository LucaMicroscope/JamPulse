import { Avatar, Button, Stack, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";

const avatarSize = 300

export default function Profile() {
    return (
        <Stack direction='row'>
            <Sidebar />
            <Stack spacing={3}>
                <Stack direction='row' spacing={10} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar
                        alt="userAvatar"
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
                        sx={{ width: avatarSize, height: avatarSize }} />
                    <Stack spacing={3} sx={{ justifyContent: 'center', maxWidth: '50%' }} >
                        <Typography component='h1' variant='h3'>Username</Typography>
                        <Typography component='subtitle' variant='h6'>Bio dell'utente esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio esempio </Typography>
                        <Typography component='subtitle' variant='h6'>Strumenti musicali: Chitarra, Basso</Typography>
                        <Typography component='subtitle' variant='h6'>Generi musicali: Rock, Pop</Typography>
                    </Stack>

                </Stack>
                <Stack direction='row' spacing={3} sx={{ justifyContent: 'center' }} >
                    <Button variant="contained" sx={{ width: '40%' }}>Segui</Button>
                    <Button variant="contained" sx={{ width: '40%' }}>Messaggio</Button>
                </Stack>
                <Stack direction='row' spacing={3} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: 'center' }} >
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </Stack>
            </Stack>
        </Stack>
    )
}