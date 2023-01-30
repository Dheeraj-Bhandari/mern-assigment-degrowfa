import express from "express";
import {addUser, getUser, deleteUser , updateUser, downloadTemplateCsv} from '../Controller/UserController.js'
const route = express.Router();


route.get("/" , (req, res)=>{
    res.send("Welcome to user api")
})
route.post("/adduser" ,addUser)
route.get("/getusers" ,getUser)
route.delete("/deleteuser/:id" ,deleteUser)
route.patch("/updateuser/:id" ,updateUser)
route.get("/downloadtemplatecsv" ,downloadTemplateCsv)



export default route;
