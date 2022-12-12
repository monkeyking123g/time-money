import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar';
//import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme} from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
// import Logo from "./cyberpank.jpg"
import {reactLocalStorage} from 'reactjs-localstorage';
// Icons 
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';





const Item = ({ title, to, icon, selected, setSelected}) => {
    //const colors = tokens();
    
    return (
      <MenuItem
        active={selected === title}
        onClick={() => (
          
          localStorage.setItem('select', title),
          setSelected(localStorage.getItem("select"))
          )}
        icon={icon}
        routerLink={<Link to={to}/>}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  };

const SideBar = ({shadow = false, credential}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userCredensial, setUserCredensial] = useState(reactLocalStorage.getObject('user'))
  console.log(userCredensial.email)
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState(localStorage.getItem("select"));
   

    // const logo = require(`../../../server/${userCredensial.image}`);
   
    return (
        <Box
            sx={{
              // background: colors.grey[800],

              display: shadow ? "none" :  'flex', 
              height: '100%',
              border: '0',
              ".sidebar" : {
                border: "0",
                boxShadow: `1px 0 0 0 ${colors.grey[800]}`,
                // backgroundColor: colors.primary[400]
              },
              // ".sidebar-inner" : {
              //   backgroundColor: colors.primary[400]
              // } 
             }}
        >
        <Sidebar
          // breakPoint="always" 
          collapsed={isCollapsed} 
          backgroundColor={colors.secondary[500]}
          // transitionDuration={200}
          >
        <Menu iconShape="square" renderMenuItemStyles={({ level, disabled, active }) => ({
          '.menu-icon': {
            backgroundColor: "transparent",
          },
          '.menu-anchor': {
            backgroundColor: active ? colors.secondary[500] : colors.secondary[500],
            color: active ? colors.pink[500] : colors.textColor[100]
          },
          
        })}
      >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={ isCollapsed ? <MenuOutlinedIcon  sx={{fontSize:"25px", color: colors.primary[700]}}/> : undefined}
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
                 
                
                   <MenuOpenOutlinedIcon  sx={{fontSize:"25px"}}/> 
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={Logo}
                  style={{ 
                    cursor: "pointer", 
                    borderRadius: "50%", 
                    boxShadow: "rgba(0, 0, 0, 1) 0px 2px 12px 0px" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
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
                title="Time Hours"
                to="/contacts"
                icon={<EventIcon />}
                selected={selected}
                setSelected={setSelected} 
              />
               <Item
                title="Month Hours"
                to="/invoices"
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
                title="Time"
                to="/form"
                icon={<EventIcon />}
                selected={selected}
                setSelected={setSelected} 
              />
               <Item
                title="Month Total"
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
               {/* <Item
                title="Bar Chart"
                to="/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected} 
              />  */}
               {/* <Item
                title="Pie Chart"
                to="/pie"
                icon={<PieChartOutlineOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected} 
              /> */}
               <Item
                title="Line Chatt"
                to="/line"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected} 
              />
               {/* <Item
                title="Sing In"
                to="/singin"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected} 
              /> */}
               {/* <MenuItem
                  title="Sing In"
                  selected={selected}
                  active={selected === "Sing In"}
                  // style={{
                  //      color: "fff",
                  // }}
                  onClick={() => (
                    
                    localStorage.setItem('select', "Sing In"),
                    setSelected(localStorage.getItem("select"))
                    )}
                  icon={<TimelineOutlinedIcon />}
                  routerLink={<Link to={"/singin"} replace/>}
                >
                  <Typography>Sing In</Typography>
              </MenuItem> */}
    
              
    
          </Box>
         
        </Menu>
      </Sidebar>
    </Box>
    )
}
export default SideBar;