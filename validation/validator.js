const validator = require("validator");
const { ErrorHandler } = require("../errorHandler/errorHandler");

const validateInputs = (req, next) => {
  const { username,password } = req.body;

  const isValidEmail = validator.isEmail(username);
  const isValidLength=username.length>3
  const isValidPhoneNumber = validator.isMobilePhone(username, "en-IN");

  if (!username || !password) {
    const err = new ErrorHandler(400, "Please fill the credentials");
    return next(err);
  }

  if(!isValidLength ){
     return next(
       new ErrorHandler(400, "Username must be a valid.")
     );
  }

if (!isValidEmail && !isValidPhoneNumber) {
  return next(
    new ErrorHandler(400, "Username must be a valid email or phone number.")
  );
}

  if (password && password.length < 3){
         const err = new ErrorHandler(400, "Invalid password");
         return next(err);
  }
  return true
  } 
    

 


module.exports=validateInputs