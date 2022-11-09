const User = require("./../models/user");
const Car = require("./../models/car");
const Request = require("./../models/request");
const { mailTo } = require("../utils/email");
const { v4 } = require("uuid");

exports.newRequest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = `${v4()}-${Math.floor(Math.random() * 9999)}`;
    const { carId, startDate, endDate } = req.body;
    const car = await Car().findOne({ where: { id: carId } });
    if (!car) return res.status(400).json({ message: "Car does not exist" });
    if (car.isBooked)
      return res.status(400).json({ message: "Car is already booked" });
    const request = await Request().create({
      carId,
      id,
      startDate,
      endDate,
      userId
    });
    await car.update({ ...car, isBooked: true });
    return res
      .status(200)
      .json({ message: "Request created successfully", request });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.grantRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await Request().findOne({ where: { id: requestId } });
    if (!request) return res.status(400).json({ message: "Request not found" });
    const car = await Car().findOne({ where: { id: request.carId } });
    const user = await User().findOne({ where: { id: request.userId } });
    if (!user) return res.status(400).json({ messsage: "User does not exist" });
    await car.update({ isBooked: true });
    await request.update({ status: "granted" });
    await mailTo(
      user.email,
      "",
      `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Fugaz+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap');
    .div{
      width:600px;
      height:380px;
      border-radius:10px;
      background-color:#161616;
      margin:auto;
      display:flex;
      color:white;
      flex-direction:column;
      background:linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url('https://wallpapercave.com/wp/wp4318749.jpg');
      background-position:center;
      padding:20px;
      background-size:contain;
      background-repeat:no-reapeat;
      font-family:"poppins";
      font-weight:bold;
      font-size:large;
    text-align:center;
      }
      .top{
    font-size:x-large;
      }
      .details{
      display:flex;
      flex-direction:column;
      margin:3em 0;
      align-items:start;
      justify-content:start;
      }
      .button{
      width:180px;
      text-decoration:none;
      padding:10px 2px;
      background:red;
      border-radius:10px;
      border:none;
      color:white;
      }
    </style>
    <div class="div">

      <span class='top'>Hooray!!!</span><span>Your Car Request has been successfully granted.</span>

      <div class="details">
      <span>Car Name: ${car.name}<span><br>
      <span>Brand: ${car.brand}<span><br>
        <span>Price: ${car.price}/day<span><br>
        <span>Currency: ${car.currency}<span><br>

           <span>Starting: ${request.startDate}<span><br>
             <span>Ending: ${request.endDate}<span><br>
      </div>
               <a href="http://lendors.vercel.app/request/id" class="button">VIEW REQUEST</a>
    </div>
            `,
      "Car Request Grant "
    );
    return res
      .status(200)
      .json({ message: "Request granted successfully", car, request });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
exports.denyRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await Request().findOne({ where: { id: requestId } });
    const user = await User().findOne({ where: { id: request.userId } });
    if (!user) return res.status(400).json({ messsage: "User does not exist" });
    if (!request) return res.status(400).json({ message: "Request not found" });
    const car = await Car().findOne({ where: { id: request.carId } });
    await mailTo();
    //       user.email,
    //       "",
    //       `
    //     <style>
    //       @import url('https://fonts.googleapis.com/css2?family=Fugaz+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap');
    //         .div{
    //           width:600px;
    //         height:380px;
    //         border-radius:10px;
    //         background-color:#161616;
    //         margin:auto;
    //         display:flex;
    //         color:white;
    //         flex-direction:column;
    //         background:linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url('https://wallpapercave.com/wp/wp4318749.jpg');
    //         background-position:center;
    //         padding:20px;
    //         background-size:contain;
    //         background-repeat:no-reapeat;
    //         font-family:"poppins";
    //         font-weight:bold;
    //         font-size:large;
    //   text-align:center;
    //     }
    //     .top{
    //   font-size:x-large;
    //     }
    //     .details{
    //     display:flex;
    //     flex-direction:column;
    //     margin:3em 0;
    //     align-items:start;
    //     justify-content:start;
    //     }
    //     .button{
    //     width:180px;
    //     text-decoration:none;
    //     padding:10px 2px;
    //     background:red;
    //     border-radius:10px;
    //     border:none;
    //     color:white;
    //     }
    //   </style>
    //   <div class="div">
    //   <span class='top'>Sorry!!!</span><span>Your Car Request has been denied.</span>
    //   <div class="details">
    //   <span>Car Name: ${car.name}<span><br>
    //   <span>Brand: ${car.brand}<span><br>
    //   <span>Price: ${car.price}/day<span><br>
    //   <span>Currency: ${car.currency}<span><br>
    //   <span>Starting: ${request.startDate}<span><br>
    //          <span>Ending: ${request.endDate}<span><br>
    //   </div>
    //            <a href="http://lendors.vercel.app/request/id" class="button">VIEW REQUEST</a>
    // </div>
    //         `,
    //       "Car Request Denial "
    await car.update({ isBooked: false });
    await request.update({ status: "denied" });
    return res
      .status(200)
      .json({ message: "Request denied successfully", car, request });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getRequestsByUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const requests = await Request().findAll({ where: { userId } });
    if (!requests.length)
      return res
        .status(400)
        .json({ message: "No requests were made by this user" });
    return res.status(200).json({ message: "Requests were found", requests });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
