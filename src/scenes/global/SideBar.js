import React from "react";
import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
//import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

import { reactLocalStorage } from "reactjs-localstorage";
// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => (
        reactLocalStorage.setObject("icon", { select: title }),
        // localStorage.setItem("select", title),
        setSelected(reactLocalStorage.getObject("icon").select)
      )}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = ({ shadow = false, credential }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userCredensial, setUserCredensial] = useState(
    reactLocalStorage.getObject("user")
  );
  const [isCollapsed, setIsCollapsed] = useState(true);
  // const { collapseSidebar } = useProSidebar();
  const userImage =
    userCredensial.image == ""
      ? undefined
      : `${process.env.REACT_APP_DOMAIN}/${userCredensial.image}`;
  const [selected, setSelected] = useState(
    reactLocalStorage.getObject("icon").select
  );

  useEffect(() => {
    if (!isNonMobile) {
      setIsCollapsed(false);
    }
  }, [isNonMobile]);

  useEffect(() => {
    const user = reactLocalStorage.getObject("user");
    if (!userCredensial.id && user.id) {
      setUserCredensial({ ...user });
    }
  }, [reactLocalStorage.getObject("user")]);

  return (
    <Box
      sx={{
        display: shadow ? "none" : "flex",
        height: "100%",
        border: "0",
        ".sidebar": {
          border: "0",
          boxShadow: `1px 0 0 0 ${colors.grey[800]}`,
        },
      }}
    >
      <Sidebar
        breakPoint={isNonMobile ? "lg" : "always"}
        // breakPoint="always"
        collapsed={isCollapsed}
        backgroundColor={colors.secondary[500]}
      >
        <Menu
          iconshape="square"
          renderMenuItemStyles={({ level, disabled, active }) => ({
            ".menu-icon": {
              backgroundColor: "transparent",
            },
            ".menu-anchor": {
              backgroundColor: active
                ? colors.secondary[500]
                : colors.secondary[500],
              color: active ? colors.pink[500] : colors.textColor[100],
            },
          })}
        >
          {/* LOGO AND MENU ICON */}
          {isNonMobile ? (
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={
                isCollapsed ? (
                  <MenuOutlinedIcon
                    sx={{ fontSize: "25px", color: colors.primary[700] }}
                  />
                ) : undefined
              }
              style={{
                margin: "10px 0 20px 0",
                color: colors.primary[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.primary[700]}>
                    ADMINIS
                  </Typography>

                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOpenOutlinedIcon sx={{ fontSize: "25px" }} />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
          ) : (
            <Typography
              variant="h3"
              color={colors.primary[700]}
              sx={{ textAlign: "center", mt: "15px", mb: "15px" }}
            >
              ADMINIS
            </Typography>
          )}

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={
                    userImage ||
                    "https://www.3dproduction.it/public/no_attore.jpg?nocache="
                  }
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    boxShadow: "rgba(0, 0, 0, 1) 0px 2px 12px 0px",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={colors.primary[700]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userCredensial.email}
                </Typography>
                <Typography variant="h5" color={colors.primary[500]}>
                  VP Chef
                </Typography>
              </Box>
            </Box>
          )}
          {/* Menu items */}
          <Box paddingLeft={isCollapsed ? "0" : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[400]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Admin Meneging"
              to="/admin"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Time"
              to="/allTime"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Month"
              to="/allMonth"
              icon={<CalendarMonthIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[400]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Created
            </Typography>
            <Item
              title="Sum by Day"
              to="/form"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sum by Month"
              to="/formMonth"
              icon={<CalendarMonthIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[400]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Line Chatt"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};
export default SideBar;
