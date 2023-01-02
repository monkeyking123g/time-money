import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, useTheme, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useStyleDataGrid } from "../styleComponent";
import { tokens } from "../theme";

const CustomDataGrid = ({
  rows,
  columns,
  onSelectionChange,
  onPurge,
  selectedRows,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const CastomeStyleDataGrid = useStyleDataGrid({
    primary: colors.pink[500],
    green: colors.greenAccent[500],
    background: colors.primary[100],
  });
  // const [selectionModel, setSelectionModel] = React.useState([]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <IconButton sx={{ ml: "auto" }} onClick={onPurge}>
          <DeleteIcon sx={{ color: colors.pink[500] }} />
        </IconButton>
      </GridToolbarContainer>
    );
  }
  return (
    <Box m="40px 0 0 0" height="75vh" sx={CastomeStyleDataGrid.root}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          onSelectionChange(newSelectionModel);
        }}
        selectionModel={selectedRows}
        components={{ Toolbar: CustomToolbar, LoadingOverlay: LinearProgress }}
        loading
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "0",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#2c2c2c !important",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "0",
          },
        }}
      />
    </Box>
  );
};

export default CustomDataGrid;
