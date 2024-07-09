const asyncHandler = require("express-async-handler");
// we no need o write a try cath method async handler hadles this whenever exception occured

const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY;

if (!JWT_SECRET) {
  generateSecretKey();
}

const getContacts = asyncHandler(async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send("No token provided");
  }

  // Verify JWT
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: "fail to authinticate token", sucess: false });
    }
    const data = await userModel.find({});
    res.json({ success: true, data: data });
  });
});

module.exports = { getContacts };
