import React from 'react';
import {Box,Typography, useTheme} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import { mockDataTeam } from "../../data/mockData";
import { AdminPanelSettingsOutlined} from '@mui/icons-material';
import { LockOpenOutlined } from '@mui/icons-material';
import { SecurityOutlined } from '@mui/icons-material';
import Header from '../../components/Header';

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colums = [
        { field: "id", headerName: "ID" },
        { 
            field: "name", 
            headerName: "Name", 
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phone",
            headerName : "Phone Number",
            flex : 1
        },
        {
            field : "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field : "access",
            headerName: "Acces Level",
            flex: 1,
            renderCell: ({row: { access }}) => {
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
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                        // backgroundColor: colors.primary[100],
                        //color : colors.grey[800],
                       
                      },
                      // svg : {
                      //   color : "#fff !important"
                      // },
                      "& .MuiDataGrid-cell": {
                        borderBottom: `2px solid ${colors.grey[800]}`,
                        fontSize: "15px"
                      },
                      "& .name-column--cell": {
                        color: colors.primary[500],
                        fontSize: "16px"
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.primary[500],
                        borderBottom: "none",
                        color: "#000",
                        fontSize: "14px"
                      },
                    //   ".MuiDataGrid-virtualScroller" : {
                    //     "background-color" : "#121212"
                    // },
                      "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[100],
                        
                      },
                      "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.primary[500],
                        fontSize: "14px",
                        color: colors.primary[100],

                        svg : {
                          color : "#000"
                        }
                      },
                      "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                      },
                      "& .MuiDataGrid-toolbarContainer" : {
                        backgroundColor : colors.primary[100],
                       
                      },
                      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[300]} !important`,
                      
                      },
                      ".MuiButtonBase-root-MuiButton-root" : {
                        color : colors.greenAccent[500]
                      },
                      ".MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked": {
                        color : colors.greenAccent[500]
                      },
                      "& .MuiTablePagination-root" : {
                        color: "#121212",
                      },
                }}   
            >
                <DataGrid disableColumnSelector rows={mockDataTeam}  columns={colums} sx={{  
                      "& .MuiDataGrid-cell:focus" : {
                        outline : "0",
                      },
                    }}/>

            </Box>
       </Box> 
    ) 


}

export default Team; 
