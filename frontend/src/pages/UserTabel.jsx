import React, { useState, useEffect } from "react";

import { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import RefreshIcon from "@material-ui/icons/Refresh";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { getUserApi, delteUserApi, updateUserApi, addUserApi } from "../api";
import * as XLSX from "xlsx/xlsx.mjs";
import { Box, Button } from '@material-ui/core';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  RefreshIcon: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function validateEmail(email) {
  const re =
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

function UserTabel() {
  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Address", field: "address" },
    { title: "DOB", field: "dob" },
    { title: "Country", field: "country" },
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  // Fecth Data

  async function fecthUserData(){
    
    axios
      .get(getUserApi)
      .then((res) => {
        setData(res.data.usersData);
        console.log(res.data.usersData);
      })
      .catch((error) => {
        console.log("Error");
      });
  }

  useEffect(() => {
    fecthUserData()
  }, []);

  const handleRowUpdate = (newData, oldData, resolve, reject) => {
    //validation
    let errorList = [];
    if (newData.name === "") {
      errorList.push("Please enter Name");
    }
    if (newData.address === "") {
      errorList.push("Please enter Address");
    }
    if (newData.dob === "") {
      errorList.push("Please enter Date of Birth");
    }
    if (newData.country === "") {
      errorList.push("Please enter Country");
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }

    if (errorList.length < 1) {
      axios
        .patch(`${updateUserApi}/${newData._id}`, newData)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      reject();
    }
  };

  const handleRowAdd = (newData, resolve, reject) => {
    //validation
    let errorList = [];
    if (newData.name === undefined) {
      errorList.push("Please enter Name");
    }
    if (newData.address === undefined) {
      errorList.push("Please enter Address");
    }
    if (newData.dob === undefined) {
      errorList.push("Please enter Date of Birth");
    }
    if (newData.country === undefined) {
      errorList.push("Please enter Country");
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }

    if (errorList.length < 1) {
      //no error
      axios
        .post(`${addUserApi}`, newData)
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          reject();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve, reject) => {
    axios
      .delete(`${delteUserApi}/${oldData._id}`)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        reject();
      });
  };

  const downloadTableToCSV = () => {
    // Removing Unwanted row

    const FilterData = data.map((row)=>{
     delete row.tableData
     delete row.__v
      return row;
    })

    const workSheet = XLSX.utils.json_to_sheet(FilterData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "UserData");

    let buf = XLSX.write(workBook, { bookType: "csv", type: "buffer" });

    XLSX.write(workBook, { bookType: "csv", type: "binary" });
    XLSX.writeFile(workBook, "UserData.csv");
  }


  return (
    <div  style={{ marginTop: "60px" }}>
      <h2 style={{ textAlign: "center" }}>User Details</h2>
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>
          <MaterialTable
            mt={90}
            title="Users Details"
            columns={columns}
            data={data}
            icons={tableIcons}
            actions={[
              {
                icon: () => <Button>Export</Button>,
                tooltip: "Export to CSV",
                onClick: downloadTableToCSV,
                isFreeAction: true,
              },
              {icon:()=><Button>Refresh</Button>, tooltip : "Refresh", onClick:()=>fecthUserData(), isFreeAction:true}
            ]}
            options={{
              headerStyle: { size: "80px" },
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  handleRowUpdate(newData, oldData, resolve, reject);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  handleRowAdd(newData, resolve, reject);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  handleRowDelete(oldData, resolve, reject);
                }),
            }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default UserTabel;
