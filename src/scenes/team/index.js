import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import Header from "../../components/Header";
import { reactLocalStorage } from "reactjs-localstorage";
import { DataGrid } from "@mui/x-data-grid";
// Style component
import { useStyleDataGrid } from "../../styleComponent";
import useMediaQuery from "@mui/material/useMediaQuery";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userCredensial = reactLocalStorage.getObject("user");

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const CastomeStyleDataGrid = useStyleDataGrid({
    primary: colors.pink[500],
    green: colors.greenAccent[500],
    background: colors.primary[100],
  });

  const rows = [
    {
      id: 1,
      email: userCredensial.email,
      earning_hour: userCredensial.ernin_hour,
      access: "admin",
    },
  ];

  const colums = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 100,
      cellClassName: "name-column--cell",
    },
    {
      flex: 0.5,
      field: "earning_hour",
      headerName: "Earning hour",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
    },
    {
      field: "access",
      headerAlign: "center",
      headerName: "Acces Level",
      flex: 0.5,
      minWidth: 150,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[500]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            <AdminPanelSettingsOutlined sx={{ color: colors.primary[100] }} />

            <Typography color={colors.primary[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Admin" subtitle="Menaging the Admin. " />
      <Box
        m={isNonMobile ? "40px 0 0 0" : "0"}
        height="75vh"
        sx={CastomeStyleDataGrid.root}
      >
        <DataGrid
          disableColumnSelector
          rows={rows}
          columns={colums}
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "0",
            },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "#2c2c2c !important",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Team;
