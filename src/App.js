import React from "react";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

// Global components
import Topbar from "./scenes/global/TopBar";
import SideBar from "./scenes/global/SideBar";

// Scenes components
import Contacts from "./scenes/time"
import Month from "./scenes/month";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
// import Bar from "./scenes/bar"
import Line from "./scenes/line";
import FormMonth from "./scenes/formMonth";
import SingIn from "./scenes/login"

import { ProSidebarProvider } from 'react-pro-sidebar';
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import { ColorModeContext, useMode } from "./theme";





function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [shadows, setShadows] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)
  const [userCredensial, setUserCredensial] = useState({}) 
  let location = useLocation();
  // const handleToggle = (component) => {
  //   setShadows(true);
  //   return component
  // };
  const pullUserCredensial = (data) => {
    console.log(data)
    reactLocalStorage.setObject('user', data);
    setUserCredensial(data);
    
  }
  
    React.useEffect(() => {
      if (location.pathname === "/singin"){
        return setShadows(true)
      }
      else setShadows(false)
    }, [location]);
    
  
    const handleLoggeind = () => {
      setLoggedIn(true);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <ProSidebarProvider>
            <div className="app">
              <SideBar isSidebar={isSidebar} shadow={shadows} credential={userCredensial}/>
              <div className="wrapper">   
          {/* <AppBar></AppBar> */}
              <Topbar setIsSidebar={setIsSidebar} shadow={shadows}/>
              <Routes>
                <Route path="/" element={<Dashboard />} /> 
                <Route path="/admin" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Month />} /> 
                // form Created 
                <Route path="/form" element={<Form />} />
                <Route path="/formMonth" element={<FormMonth />} /> 

                <Route path="/calendar" element={<Calendar />} />
                {/* <Route path="/bar" element={<Bar />} />  */}
                <Route path="/line" element={<Line />} />
                <Route replace path="/singin" element={<SingIn loggeIn={handleLoggeind} credensial={pullUserCredensial}/>}/>
                     
                <Route/>
                {/* <Route path="*" 
                    element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/singin"/>}>

                </Route> */}
                
              </Routes>
             
              </div>
              {/* <NavLink  to="scenes/SingIn/">
              
              </NavLink>
              */}
            </div>
           

          </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
