const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const router = express.Router();

const { LoginModel } = require("../models/loginModel");
const generateSecretKey = require("../utils/generateSecreteKey");

const JWT_SECRET = process.env.SECRET_KEY;

if (!JWT_SECRET) {
  generateSecretKey();
}

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await LoginModel.find({ email });
  if (user.length) {
    return res.json({ msg: "User is already available", sucess: false });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const result = await LoginModel.create({
    username,
    email,
    password: hashedPassword,
  });
  if (result) {
    res.status(201).send("User registered successfully");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await LoginModel.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  // Verify password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid password");
  }

  // Create JWT token
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return res.send({ auth: true, token });
});

router.get("/protected", (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send("No token provided");
  }

  // Verify JWT
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send("Failed to authenticate token");
    }

    res.status(200).send("Access granted");
  });
});

module.exports = router;
