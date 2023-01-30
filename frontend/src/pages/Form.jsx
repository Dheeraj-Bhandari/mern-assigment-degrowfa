import React, {  useState } from "react";
import {  FormControl,  Button } from "@mui/material";
import { addUserApi } from "../api";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { Grid } from "@material-ui/core";
const Form = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

 
  // Cheking Email Validation
  function validateEmail(email) {
    const re =
      /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
  }

      // Handling Form Input And Adding To Database

     function HandleAddUser(e) {
        e.preventDefault();
        
        if (name === "" || typeof(name)==='number') {
          return alert("Enter a Valid Name")
        }
        if (address === "") {
          return alert("Enter a Valid Adress")
        }
        if (dob === "") {
          return alert("Enter a Valid Date of Birth")
        }
        if (country === "") {
          return alert("Enter a Valid Country")
        }
        if (email === "" || validateEmail(email) === false) {
          return alert("Enter a Valid Email")
        }
    
      const body = {
        name,
        dob,
        address,
        email,
        country,
      };

      try {
        axios
        .post(`${addUserApi}`, body)
        .then((res) => {alert("User Added Sucessfully")
        setName("")  ; setEmail("") ; setDob("") ;  setAddress("") ; setCountry("");
      });
      } catch (error) {
        Alert("Something went Wrong", error)
      }
      
    }
    
    return (
      <>
      <h1 style={{"textAlign":"center", "marginTop":"20px"}}>Add User Data</h1>
    <Grid
      mt={20}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '60vh' }}
    
    >
      <FormControl action="">
        <TextField
          id="outlined-basic"
          label="Name"
          required
          variant="outlined"
          value={name}
          
          onChange={(e)=>setName(e.target.value)}
        />{" "}
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          type="email"
          required
          variant="outlined"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />{" "}
        <br />
        <TextField
          id="outlined-basic"
          type="date"
          required
          variant="outlined"
          value={dob}
          onChange={(e)=>setDob(e.target.value)}
          />{" "}
        <br />
        <TextField
          id="outlined-basic"
          label="Address"
          required
          variant="outlined"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          />{" "}
        <br />
        <TextField
          id="outlined-basic"
          label="Country"
          required
          variant="outlined"
          value={country}
          onChange={(e)=>setCountry(e.target.value)}
          />{" "}
        <br />
        <Button onClick={HandleAddUser} variant="outlined" >Submit</Button>
      </FormControl>
    </Grid>
  
          </>
  );
};

export default Form;
