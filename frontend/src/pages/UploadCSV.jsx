import React , {useState} from 'react'
import MaterialTable from 'material-table'
import * as XLSX from 'xlsx'


const UploadCSV = () => {
    const [colDefs, setColDefs] = useState();
    const [data, setData] = useState();

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
  return (
    <div>
    
    <input type="file" onChange={importedExcel}/>
    <MaterialTable
    title="Custome Data"
    data={data}
    columns={colDefs}
    />
    </div>
  )
}

export default UploadCSV