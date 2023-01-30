
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

export const getHotel = async (req, res) => {
  try {
    console.log("inside gethotel");

    const city = req.query.city || "";
    const rating = req.query.rating || "";
    const totalData = await Hotels.countDocuments();

    const { limit = 10, page = 1 } = req.query;
    const hotels = await Hotels.find({
      $or: [
        { city: { $regex: ".*" + city + ".*", $options: "i" } },
        {
          hotelName: {
            $regex: ".*" + req.query.hotelName + ".*",
            $options: "i",
          },
        },
        { address: { $regex: ".*" + req.query.address + ".*", $options: "i" } },
        { rating: { $regex: ".*" + rating + ".*", $options: "i" } },
      ],
    })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    let nextPage;
    let prevPage;
    if (page < totalData / limit - 1) {
      nextPage = Number(page) + 1;
    }
    if (page != 1) {
      prevPage = Number(page) - 1;
    }
    res.status(200).json({
      totalPage: Math.round(totalData / limit),
      currentPage: Number(page),
      nextPage: nextPage,
      prevPage: prevPage,
      hotels,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotelById = async (req, res) => {
  try {
    //    console.log(req.params.id)
    const HotelById = await Hotels.findById(req.params.id);
    res.status(200).json(HotelById);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getHotelByQuery = async (req, res) => {
  try {
    console.log(req.params.query);
    const HotelByCity = await Hotels.find({
      $or: [
        { city: { $regex: req.params.query } },
        { hotelName: { $regex: req.params.query } },
        { address: { $regex: req.params.query } },
        { rating: { $regex: req.params.query } },
      ],
    });

    res.status(200).json(HotelByCity);
  } catch (error) {
    res.status(500).json(error);
  }
};
