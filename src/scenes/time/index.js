import { Box } from "@mui/material";
import { useEffect, useState } from "react";
// import { tokens } from "../../theme";
import Header from "../../components/Header";
import dayjs from "dayjs";

import CustomDataGrid from "../../components/DataGrid";
import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

const colums = [
  {
    field: "nam",
    headerName: "ID",
    flex: 0.4,
  },
  {
    field: "company",
    headerName: "Company",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "start",
    headerName: "From",
    type: "string",
    headerAlign: "left",
    align: "left",
    cellClassName: "name-column--cell",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "end",
    headerName: "At",
    type: "string",
    headerAlign: "left",
    align: "left",
    cellClassName: "name-column--cell",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "total",
    headerName: "Total",
    type: "string",
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

const ListTime = () => {
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
      `${process.env.REACT_APP_DOMAIN}/api/get/time/${userCredensial.id}`
    ).then((server) => {
      if (server.status === 200) {
        let nam = 1;
        server.data.map((el) => {
          const updateData = {
            id: el.ID,
            nam: nam,
            company: el.company,
            start: el.start.slice(0, 5),
            end: el.end.slice(0, 5),
            total: el.total,
            dateCreated: dayjs(el.dateCreated).format("DD-MM-YYYY"),
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
      Axios.delete(`${process.env.REACT_APP_DOMAIN}/api/delete/time/${i}`);
      removeObjectWithId(newRows, i);
    });
    setSelectedRows([]);
    return setRows(newRows);
  };
  return (
    <Box m="20px">
      <Header title="All Time" subtitle="List by Time Created" />
      <CustomDataGrid
        rows={rows}
        columns={colums}
        onSelectionChange={handleSelectionChange}
        onPurge={handlePurge}
        selectedRows={selectedRows}
      />
    </Box>
  );
};

export default ListTime;
