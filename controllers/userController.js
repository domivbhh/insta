const { ErrorHandler } = require("../errorHandler/errorHandler")
const User = require("../models/userModel")
const validateInputs = require("../validation/validator")
const fs = require("fs");
const path = require("path");


const dataFilePath = path.join(__dirname, "data.json");

const PostData=async(req,res,next)=>{
    try {
      const { username, password } = req.body;

      const newData=req.body

      // const writeData = (data) => {
      //   fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      // };

      const readData = () => {
        try {
          const data = fs.readFileSync(dataFilePath, "utf8");
          return JSON.parse(data);
        } catch (error) {
          return [];
        }
      };

      const existingData = readData();


      existingData.push(newData);

      // writeData(existingData);

      //new
      const datas=new User.create({username,password})
      await datas.save()
      

      res.status(200).json({
        status: "success",
        message: "user login success",
        //new
        mongo:datas
      });
    } 
    catch (error) {
       new ErrorHandler(400,error.message)    
    }
}


const GetData=async(req,res,next)=>{
    const readData = () => {
      try {
        const data = fs.readFileSync(dataFilePath, "utf8");
        return JSON.parse(data);
      } catch (error) {
        // Return an empty array if the file does not exist or is corrupted
        return [];
      }
    };
    const existingData = readData();
    //new
       const mongo=await User.find()

       res.status(200).json({
         status: "success",
         data:existingData,
         //new
         mongos:mongo
       });


}


module.exports={PostData,GetData}