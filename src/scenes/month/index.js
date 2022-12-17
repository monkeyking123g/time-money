import { Box , useTheme} from '@mui/material';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import { useStyleDataGrid } from '../../styleComponent';
import Header from '../../components/Header';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import Axios  from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
const rows = [
  {
    id: 1,
    month: randomTraderName(),
    hours: 123+"h",
    dateCreated: randomCreatedDate().toISOString().slice(0, 10),
  },
  {
    id: 2,
    month: randomTraderName(),
    hours: 223,
    dateCreated: randomCreatedDate().toISOString().slice(0, 10),
  },
  {
    id: 3,
    month: randomTraderName(),
    hours: 323,
    dateCreated: randomCreatedDate().toISOString().slice(0, 10),
  },
  {
    id: 4,
    month: randomTraderName(),
    hours: 223,
    dateCreated: randomCreatedDate().toISOString().slice(0, 10),
  },
  {
    id: 5,
    month: randomTraderName(),
    total: 223,
    dateCreated: randomCreatedDate().toISOString().slice(0, 10),
    
  },
];


const Month = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const CastomeStyleDataGrid = useStyleDataGrid({
      primary: colors.pink[500],
      green: colors.greenAccent[500],
      background : colors.primary[100]
    })
    const [userCredensial, setUserCredensial] = useState(reactLocalStorage.getObject('user'))
    const [rowsData, setRowsData] = useState([])

    useEffect(() => {
      const newData = []
      const getTimeUser = Axios.get(`http://localhost:3002/api/get/month/${userCredensial.id}`).then((server)=>{
          console.log(server)
          if (server.status === 200){ 
           let id = 1
           server.data.map((el) => {
            const updateData =  {
               id : id,
               month: el.month,
               hours : el.total,
               dateCreated : new Date(el.dateCreated).toISOString().slice(0, 10)
              }
            newData.push(updateData)
            id += 1
           
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
            field: "month", 
            headerName: "Month", 
            flex: 0.5,
        },
        {
            field: "hours",
            headerName: "Hours",
            type: "number",
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
            <Header title="All Month"  subtitle="List of Month Work Created"/>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={ CastomeStyleDataGrid.root }   
            >
                <DataGrid
                     //disableColumnFilter
                     disableColumnSelector
                     //disableDensitySelector
                
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

export default Month; 
