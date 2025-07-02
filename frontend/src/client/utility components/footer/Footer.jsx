import Typography from "@mui/material/Typography";
import { Box, justifyContent } from "@mui/system";

export default function Footer(){

    return(
        <>
        <Box sx={{display:"flex",flexDirection:'column', justifyContent:"center", alignItems:"center" }} component={'div'}>

            <Typography variant="h5">Learning Management System</Typography>
            <Typography variant="p">Copyright@ 2025</Typography>
        </Box>
        </>
    )
}