import { Box , useTheme} from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import { useStyleDataGrid } from '../../styleComponent';
import Header from '../../components/Header';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
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
    hours: 223,
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
                sx={ CastomeStyleDataGrid.root
                  // "& .MuiDataGrid-root": {
                  //     border: "none",
                  //     // backgroundColor: colors.primary[100],
                  //     //color : colors.grey[800],
                     
                  //   },
                  //   // svg : {
                  //   //   color : "#fff !important"
                  //   // },
                  //   "& .MuiDataGrid-cell": {
                  //     borderBottom: `2px solid ${colors.grey[800]}`,
                  //     fontSize: "15px"
                  //   },
                  //   "& .name-column--cell": {
                  //     color: colors.greenAccent[500],
                  //     fontSize: "16px"
                  //   },
                  //   "& .MuiDataGrid-columnHeaders": {
                  //     backgroundColor: colors.primary[500],
                  //     borderBottom: "none",
                  //     color: "#000",
                  //     fontSize: "14px"
                  //   },
                  // //   ".MuiDataGrid-virtualScroller" : {
                  // //     "background-color" : "#121212"
                  // // },
                  //   "& .MuiDataGrid-virtualScroller": {
                  //     backgroundColor: colors.primary[100],
                      
                  //   },
                  //   "& .MuiDataGrid-footerContainer": {
                  //     borderTop: "none",
                  //     backgroundColor: colors.primary[500],
                  //     fontSize: "14px",
                  //     color: colors.primary[100],

                  //     svg : {
                  //       color : "#000"
                  //     }
                  //   },
                  //   "& .MuiCheckbox-root": {
                  //     color: `${colors.greenAccent[200]} !important`,
                  //   },
                  //   "& .MuiDataGrid-toolbarContainer" : {
                  //     backgroundColor : colors.primary[100],
                     
                  //   },
                  //   "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  //     color: `${colors.grey[300]} !important`,
                    
                  //   },
                  //   ".MuiButtonBase-root-MuiButton-root" : {
                  //     color : colors.greenAccent[500]
                  //   },
                  //   ".MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked": {
                  //     color : colors.greenAccent[500]
                  //   },
                  //   "& .MuiTablePagination-root" : {
                  //     color: "#121212",
                  //   },
              }   
              
            >
                <DataGrid
                     //disableColumnFilter
                     disableColumnSelector
                     //disableDensitySelector
                
                    rows={rows}  
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
