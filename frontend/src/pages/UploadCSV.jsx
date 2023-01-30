import React , {useState} from 'react'
import MaterialTable from 'material-table'
import { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";

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
import Alert from "@mui/material/Alert";

import * as XLSX from 'xlsx'
import { Box, Button } from '@material-ui/core';
import {  TextField } from "@mui/material";
import FileDownload from "js-file-download"
import {downloadCsvTemplate} from '../api'



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
  

const UploadCSV = () => {
    const [colDefs, setColDefs] = useState();
    const [data, setData] = useState();
    
    const [json, setJson] = useState();

    const getExtension = (file)=>{
        const fileName = file.name.split(".");
        const fileType = fileName[fileName.length-1]

        if(fileType==="csv" || fileType === "xlsx" || fileType==="xls"){
            return true;
        }
        return false;
    }

    const convertToJson =(header, data)=>{
        const rows = []
        data.forEach(row=>{
            let rowData = {}
            row.forEach((element , index)=>{
                rowData[header[index]] = element
            })
            rows.push(rowData)
        })
        setJson(JSON.stringify(rows))
        return rows;
    }

    const importedExcel = (e)=>{
        const file  = e.target.files[0];

        const reader = new FileReader();
        reader.onload=(event)=>{
            // parsing Data
            const bstr = event.target.result
            const workBook = XLSX.read(bstr, {type:"binary"})

            // Geeting First Selected Sheet
            const workSheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[workSheetName]

            // Converting to Array
            const fileData = XLSX.utils.sheet_to_json(workSheet, {header : 1})

            // Storing Header Information 
            const headers = fileData[0]
            const heads = headers.map(head=>({title:head, field:head}))
            setColDefs(heads)


            // Deleting Header Information
            fileData.splice(0, 1);
            setData(convertToJson(headers, fileData))
            


        }
        if(getExtension(file)){

            reader.readAsBinaryString(file)
        }
        else{
            alert("Invalid File Type. Please Uplaod CSV or Excel File Type")
        }
    }

    const downloadTemplateCSV = (e)=>{
        e.preventDefault();
        try {
            
            window.open(downloadCsvTemplate)
        } catch (error) {
            alert("Something went Wrong", error)
        }
    }

    const dowloadTableDataAsJson=()=>{
       
        FileDownload(json, "json.json")
    }
  return (
    <Box mt={5} p={6}>
    
    <Box mb={5}>
    <TextField id="outlined-basic" type="file" variant="outlined" onChange={importedExcel} />
    <Button onClick={downloadTemplateCSV}>Download CSV</Button>
    </Box>
    <MaterialTable
    title="Custome Data"
    data={data}
    columns={colDefs}
    icons={tableIcons}
    actions={[
        {
          icon: () => <Button>Export JSON</Button>,
          tooltip: "Download As JSON",
          onClick: dowloadTableDataAsJson,
          isFreeAction: true,
        },
        
      ]}
    
    />
    </Box>
  )
}

export default UploadCSV