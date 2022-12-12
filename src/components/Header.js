import { Typography, Box, useTheme  } from "@mui/material";
import { tokens } from "../theme";

const Header = ({title, TitleColor , subtitle,}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return( 
    <Box mb="30px">
        <Typography 
        variant="h2" 
        color={TitleColor || colors.primary[700]} 
        fontWeight="bold"
        sx={{mb:"5px"}}
        >
        {title}
        </Typography>
        <Typography variant="h5" color={colors.grey[200]}>{subtitle}</Typography>
    </Box>
    );
}

export default Header;