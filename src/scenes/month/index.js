import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import CustomDataGrid from "../../components/DataGrid";
import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import CircularIndeterminate from "../../components/Circular";

const colums = [
  { field: "nam", headerName: "ID", flex: 0.5 },
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

const Month = () => {
  const userCredensial = reactLocalStorage.getObject("user");

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const newData = [];
    const getTimeUser = Axios.get(
      `${process.env.REACT_APP_DOMAIN}/api/get/month/${userCredensial.id}`
    )
      .then((server) => {
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
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      })
      .finally(function () {
        setLoading(false);
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
      Axios.delete(`${process.env.REACT_APP_DOMAIN}/api/delete/month/${i}`);
      removeObjectWithId(newRows, i);
    });
    setSelectedRows([]);
    return setRows(newRows);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="All Month" subtitle="List by Month created." />
        {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      </Box>
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
