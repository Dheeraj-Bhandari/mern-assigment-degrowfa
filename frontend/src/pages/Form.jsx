import React, { useEffect, useState } from "react";
import { TextField, FormControl, Box, Button } from "@mui/material";
import { addUserApi, getUserApi } from "../api";
import UserTabel from "./UserTabel";

import axios from "axios";
import { Grid } from "@material-ui/core";
const Form = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

 
  
     function HandleAddUser(e) {
        e.preventDefault();
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
        .then((res) => console.log(res.data));
      } catch (error) {
        console.log(error)
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
