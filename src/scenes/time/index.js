import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import dayjs from "dayjs";
import CircularIndeterminate from "../../components/Circular";
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
  const userCredensial = reactLocalStorage.getObject("user");

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const newData = [];
    Axios.get(
      `${process.env.REACT_APP_DOMAIN}/api/get/time/${userCredensial.id}`
    )
      .then((server) => {
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
      Axios.delete(`${process.env.REACT_APP_DOMAIN}/api/delete/time/${i}`);
      removeObjectWithId(newRows, i);
    });
    setSelectedRows([]);
    return setRows(newRows);
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="All Time" subtitle="List by Time Created" />
        {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      </Box>

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
