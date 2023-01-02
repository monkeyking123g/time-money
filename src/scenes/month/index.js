import { Box } from "@mui/material";
import { useState, useEffect } from "react";
// import { tokens } from "../../theme";

import Header from "../../components/Header";
import CustomDataGrid from "../../components/DataGrid";

import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

const Month = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [userCredensial, setUserCredensial] = useState(
    reactLocalStorage.getObject("user")
  );

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const newData = [];
    const getTimeUser = Axios.get(
      `http://localhost:3002/api/get/month/${userCredensial.id}`
    ).then((server) => {
      if (server.status === 200) {
        let nam = 1;
        server.data.map((el) => {
          const updateData = {
            id: el.ID,
            nam: nam,
            month: el.month,
            hours: el.total,
            dateCreated: new Date(el.dateCreated).toISOString().slice(0, 10),
          };
          newData.push(updateData);
          nam += 1;
        });
      }
      //  setRowsData(rowsData => [...rowsData, newdata])
      setRows(newData);
    });
  }, []);
  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };
  function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
    return arr;
  }
  const handlePurge = () => {
    const newRows = [...rows];
    selectedRows.forEach((i) => {
      Axios.delete(`http://localhost:3002/api/delete/month/${i}`);
      removeObjectWithId(newRows, i);
    });
    setSelectedRows([]);
    return setRows(newRows);
  };
  const colums = [
    { field: "nam", headerName: "ID", flex: 0.5 },
    // {field: "registrarId", headerName: "Registrar ID"},
    {
      field: "month",
      headerName: "Month",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "hours",
      headerName: "Hours",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      type: "date",
      flex: 0.5,
      minWidth: 100,
    },
  ];

  return (
    <Box m="20px">
      <Header title="All Month" subtitle="List by Month created." />
      <CustomDataGrid
        rows={rows}
        columns={colums}
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        onPurge={handlePurge}
      />
    </Box>
  );
};

export default Month;
