import React from 'react';
import { useState } from "react";
import {Box,Typography, useTheme} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import { AdminPanelSettingsOutlined } from '@mui/icons-material';
import { LockOpenOutlined } from '@mui/icons-material';
import { SecurityOutlined } from '@mui/icons-material';
import Header from '../../components/Header';
import { reactLocalStorage } from 'reactjs-localstorage';

// Style component 
import { useStyleDataGrid } from '../../styleComponent';


const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userCredensial, setUserCredensial] = useState(reactLocalStorage.getObject('user'))
    const CastomeStyleDataGrid = useStyleDataGrid({
      primary: colors.pink[500],
      green: colors.greenAccent[500],
      background : colors.primary[100]
    })
    console.log(userCredensial)
    const rows = [{
      id : 1,
      email: userCredensial.email,
      earning_hour : userCredensial.ernin_hour,
      access: "admin"
    }] 
    console.log(rows)
    //   for (var key in userCredensial) {
    //     if (userCredensial.hasOwnProperty(key)) {
    //         console.log(key + " -> " + userCredensial[key]);
    //         rows = Object.assign(key, userCredensial[key])
    //     }
    // }
    // })
    // console.log(newUserCredensial)
    const colums = [
        { field: "id", headerName: "ID",  flex: 0.5 },
        { 
            field: "email", 
            headerName: "Email", 
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            flex: 0.5,
            field: "earning_hour",
            headerName: "Earning hour",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field : "access",
            headerAlign: 'center',
            headerName: "Acces Level",
            flex: 0.5,
            renderCell: ({row:{access }}) => {
                return (
                    <Box 
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor = {
                            access === "admin" 
                            ? colors.greenAccent[500]
                            : colors.greenAccent[700] 
                        }
                        borderRadius="4px"
                    >
                        {access === "admin" && <AdminPanelSettingsOutlined  sx={{color: colors.primary[100]}}/>}
                        {access === "manager" && <SecurityOutlined sx={{color: colors.primary[100]}}/>}
                        {access === "user" && <LockOpenOutlined sx={{color: colors.primary[100]}}/>}
                        <Typography color={colors.primary[100]} sx={{ ml: "5px"}}>
                            {access}
                        </Typography>
                    </Box>
                )
            }
        },
        
    ]

    return (
       <Box m="20px">
            <Header title="Admin"  subtitle="Menaging the Admin members. "/>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={ CastomeStyleDataGrid.root }   
            >
                <DataGrid disableColumnSelector rows={rows}  columns={colums} sx={{  
                      "& .MuiDataGrid-cell:focus" : {
                        outline : "0",
                      },
                     
                    }}/>

            </Box>
       </Box> 
    ) 
}

export default Team; 
