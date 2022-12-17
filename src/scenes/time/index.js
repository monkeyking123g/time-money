import { Box , useTheme} from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import { useStyleDataGrid } from '../../styleComponent';
import Header from '../../components/Header';
import {
  randomCreatedDate,
  randomTraderName,
} from '@mui/x-data-grid-generator';

import Axios  from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';

export const rows = [
  {
    id: 1,
    company: randomTraderName(),
    start: randomCreatedDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    end: randomCreatedDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    total: "9",
    dateCreated: randomCreatedDate().toISOString().slice(0, 10),
  },
  {
    id: 2,
    company: randomTraderName(),
    start: randomCreatedDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    end: randomCreatedDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    total: "9",
    dateCreated: randomCreatedDate().toISOString().slice(0, 10),
  },
  {
    id: 3,
    company: randomTraderName(),
    start: randomCreatedDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    end: randomCreatedDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    total: "9",
    dateCreated: randomCreatedDate().toISOString().slice(0, 10),
  },
  {
    id: 4,
    company: randomTraderName(),
    start: randomCreatedDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    end: randomCreatedDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    total: "9",
    dateCreated: randomCreatedDate().toISOString().slice(0, 10),
  },
  {
    id: 5,
    company: randomTraderName(),
    start: randomCreatedDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    end: randomCreatedDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    total: "9",
    dateCreated: randomCreatedDate().toISOString().slice(0, 10),
    
  },
];


const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const CastomeStyleDataGrid = useStyleDataGrid({
      primary: colors.pink[500],
      green: colors.greenAccent[500],
      background : colors.primary[100]
      
    })

    const [userCredensial, setUserCredensial] = useState(reactLocalStorage.getObject('user'))
    const [rowsData, setRowsData] = useState([])
    console.log(userCredensial.id)

    useEffect(() => {
      const newData = []
      const getTimeUser = Axios.get(`http://localhost:3002/api/get/time/${userCredensial.id}`).then((server)=>{
          console.log(server)
          if (server.status === 200){
           let id = 1 
           server.data.map((el) => {
            const updateData =  {
               id : id,
               company: el.company,
               start : el.start,
               end : el.end,
               total : el.total,
               dateCreated : new Date(el.dateCreated).toISOString().slice(0, 10)
              }
            newData.push(updateData)
            id +=1
          })
        }
          //  setRowsData(rowsData => [...rowsData, newdata])
        setRowsData(newData)
       })
    }, []);
  
    
    const colums = [
        { field: "id", headerName: "ID", flex: 0.5 },
        // {field: "registrarId", headerName: "Registrar ID"},
        { 
            field: "company", 
            headerName: "Company", 
            flex: 0.5,
        },
        {
            field: "start",
            headerName: "From",
            type: "string",
            headerAlign: "left",
            align: "left",
            cellClassName: "name-column--cell",
            flex: 0.5,
        },
        {
          field: "end",
          headerName: "At",
          type: "string",
          headerAlign: "left",
          align: "left",
          cellClassName: "name-column--cell",
          flex: 0.5,
      },
      {
        field: "total",
        headerName: "Total",
        type: "string",
        headerAlign: "left",
        align: "left",
        cellClassName: "name-column--cell",
        flex: 0.5,
    },
        {
            field: "dateCreated",
            headerName : "Date Created",
            type: 'date',
            flex: 0.5,
        },
       
    ]

    return (
       <Box m="20px">
            <Header title="All Time"  subtitle="List of Time Work add"/>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={ CastomeStyleDataGrid.root }   
            >
                <DataGrid 
                    rows={rowsData}  
                    columns={colums} 
                    components={{Toolbar : GridToolbar}}
                    sx={{  
                      "& .MuiDataGrid-cell:focus" : {
                        outline : "0",
                      },
                    }}
                />
            </Box>
       </Box> 
    ) 


}

export default Contacts; 
