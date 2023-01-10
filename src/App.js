import React from "react";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
// import { reactLocalStorage } from "reactjs-localstorage";
// Global components
import Topbar from "./scenes/global/TopBar";
import SideBar from "./scenes/global/SideBar";

// Scenes components
import ListTime from "./scenes/time";
import Month from "./scenes/month";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
// import Bar from "./scenes/bar"
import Line from "./scenes/line";
import FormMonth from "./scenes/form/month";
import SingIn from "./scenes/login";

import { ProSidebarProvider } from "react-pro-sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [shadows, setShadows] = useState(false);

  const [userCredensial, setUserCredensial] = useState(
    reactLocalStorage.getObject("user")
  );

  let navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    if (JSON.stringify(userCredensial) === "{}") {
      console.log("bag");
      return navigate("/singin");
    }
  }, [userCredensial]);

  React.useEffect(() => {
    if (location.pathname === "/singin") {
      setShadows(true);
    } else setShadows(false);
  }, [location]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <div className="app">
            <SideBar
              isSidebar={isSidebar}
              shadow={shadows}
              credential={userCredensial}
            />
            <div className="wrapper">
              <Topbar setIsSidebar={setIsSidebar} shadow={shadows} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin" element={<Team />} />
                <Route path="/allTime" element={<ListTime />} />
                <Route path="/allMonth" element={<Month />} />
                <Route path="/form" element={<Form />} />
                <Route path="/formMonth" element={<FormMonth />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/line" element={<Line />} />
                <Route replace path="/singin" element={<SingIn />} />
              </Routes>
            </div>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
