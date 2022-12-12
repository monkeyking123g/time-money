import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StateBox = ({title, subtitle, icon, process, increase}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography 
                        variant="h4" 
                        fontWeight="bold" 
                        sx={{color: colors.greenAccent[500]}}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <ProgressCircle progress={process} size="50"/>
                </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                <Typography 
                        variant="h5" 
                        sx={{color: "#ddd"}}
                    >
                        {subtitle}
                    </Typography>
                <Typography 
                        variant="h5" 
                        fontStyle="italic" 
                        sx={{color: colors.primary[500]}}
                    >
                        {increase}
                    </Typography>
                </Box>

            </Box>

        
    )
};

export default StateBox;