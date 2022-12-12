import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext,tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";

// Icons import 
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Search } from "@mui/icons-material";

const Topbar = ({shadow = false}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display={shadow ? "none" : "flex"} justifyContent="space-between" p={2} backgroundColor={colors.primary[100]} sx={{
            // boxShadow: "0px 0px 0px 2px rgba(0, 0, 0, 0.4)"
        }}>
            <Box 
                display="flex" 
                backgroundColor={colors.primary[100]}
                borderRadius="3px"
                sx={{border: `1px solid ${colors.grey[800]}`}}
            >
                <InputBase sx={{ml: 2, flex: 1, color: colors.textColor[100]}} placeholder="Search">
                </InputBase>
                <IconButton type="button" sx={{
                    p: 1, 
                    color: colors.primary[700], 
                    backgroundColor: colors.secondary[500],
                    borderRadius : "0"
                    }}>
                    <Search></Search>
                </IconButton>
            </Box>
            {/* Icons */}
            
            <Box display="flex">
                <IconButton>
                    <NotificationsNoneOutlinedIcon sx={{ color: colors.primary[700] }} />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon sx={{ color: colors.primary[700] }}/>
                </IconButton>
                <IconButton>
                    <PersonOutlineOutlinedIcon sx={{ color: colors.primary[700] }}/>
                </IconButton>
                <IconButton component={Link} to="/singin">
                    <LogoutOutlinedIcon sx={{ color: colors.greenAccent[500] }}/>
                </IconButton>
            </Box>

        </Box>
    ) 
}

export default Topbar;

