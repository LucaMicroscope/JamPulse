import { Box, Typography } from "@mui/material";

export default function MessageBubble(){
    return(
        <Box sx={{
            justifySelf:'end',
            backgroundColor:'Green',
            padding:2,
            borderRadius:3,
            borderBottomRightRadius:0
        }}>
            <Typography variant='body1'>Ciao</Typography>
        </Box>
    )
}