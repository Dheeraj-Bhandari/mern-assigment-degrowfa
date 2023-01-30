
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

   
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    dob:{
        type:String,
        require: true
    },
    address:{
        type:String
       
    },
    country:{
        type:String
       
    },
   
   
    
})

const Users = mongoose.model('users', userSchema);

export default Users;

