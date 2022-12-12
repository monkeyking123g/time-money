import { Box , useTheme} from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import { useStyleDataGrid } from '../../styleComponent';
import Header from '../../components/Header';
import {
  randomCreatedDate,
  randomTraderName,
  // randomUpdatedDate,
} from '@mui/x-data-grid-generator';

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

export default Contacts; 
