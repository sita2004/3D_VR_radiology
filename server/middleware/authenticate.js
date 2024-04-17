const Users = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; 
    if (!token) {
      res.status(401).send("No token");
    } else {
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await Users.findOne({ _id: verifyToken._id, "tokens.token": token });
      if (!rootUser) {
        res.status(401).send("User Not Found");
      }
      req.user = rootUser;
      next();
    }
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    res.status(401).send(error.message); // Send the error message
  }
};

module.exports = authenticate;