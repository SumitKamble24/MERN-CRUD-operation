require("dotenv").config();
const crypto = require("crypto");
const fs = require("fs");

const dotenv = require("dotenv");

function generateSecretKey(length = 64) {
  const generatedKey = crypto.randomBytes(length).toString("hex");
  const secretKey = generatedKey;
  dotenv.config(); // Load existing environment variables from .env file
  //   fs.appendFileSync("./.env", `\nSECRET_KEY=${secretKey}`, "utf8");
  fs.writeFileSync("./.env", `SECRET_KEY=${secretKey}`, "utf8");
}

// Generate new secret key

// Create or load .env file

// Store the secret key in .env file

// Optionally, you might want to log or display the secret key for verification

module.exports = generateSecretKey;
