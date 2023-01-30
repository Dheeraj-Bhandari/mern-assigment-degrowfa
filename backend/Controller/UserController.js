
import Users from "../database/model/User.js";

export const addUser = async (req, res) => {
  try {
    const addUser = await Users.create({
      
      name: req.body.name,
      address: req.body.address,
      dob: req.body.dob,
      email: req.body.email,
      country: req.body.country,
      
    });

    await addUser.save();
    res.status(200).json(addUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  try {
 
    const usersData = await Users.find({})

    res.status(200).json({
    usersData
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


export const deleteUser = async (req, res) => {
  
  try {
 
    const usersData = await Users.findByIdAndDelete(req.params.id)

    res.status(200).json({
    usersData
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


export const updateUser = async (req, res) => {

  
  const updateBody = {
    name : req.body.name,
    email : req.body.email,
    address : req.body.address,
    country : req.body.country,
    dob : req.body.dob,
    
  }
 
    try {
      const usersData = await Users.findByIdAndUpdate(req.params.id, updateBody)
      res.status(200).json(usersData);

    } catch (error) {
      res.status(500).json({
        error
        });
    }
};

export const downloadTemplateCsv = async (req, res)=>{
  try {
    res.download("./asset/download.csv")
    
  } catch (error) {
    res.status(500).json((error))
  }
}