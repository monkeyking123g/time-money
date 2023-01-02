import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// Icons import
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Search } from "@mui/icons-material";

const Topbar = ({ shadow = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { toggleSidebar } = useProSidebar();

  return (
    <Box
      display={shadow ? "none" : "flex"}
      justifyContent="space-between"
      p={2}
      backgroundColor={colors.primary[100]}
      sx={
        {
          // boxShadow: "0px 0px 0px 2px rgba(0, 0, 0, 0.4)"
        }
      }
    >
      {isNonMobile ? null : (
        <IconButton onClick={() => toggleSidebar()}>
          <MenuOutlinedIcon sx={{ color: colors.primary[700] }} />
        </IconButton>
      )}
      <Box
        display="flex"
        backgroundColor={colors.primary[100]}
        borderRadius="3px"
        sx={{ border: `1px solid ${colors.grey[800]}` }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: colors.textColor[100] }}
          placeholder="search"
        ></InputBase>
        <IconButton
          type="button"
          sx={{
            p: 1,
            color: colors.primary[700],
            backgroundColor: colors.secondary[500],
            borderRadius: "0",
          }}
        >
          <Search></Search>
        </IconButton>
      </Box>
      {/* Icons */}

      <Box display="flex">
        <IconButton component={Link} to="/singin">
          <LogoutOutlinedIcon sx={{ color: "#cf6679" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
