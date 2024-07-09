const express = require("express");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const userLoginRoute = require("./routes/userLoginRoute");
const app = express();
const bodyParser = require("body-parser");
const generateSecretKey = require("./utils/generateSecreteKey");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
connectDb();
generateSecretKey();

app.use("/", require("./routes/userRoute"));

app.post("/create", async (req, res) => {
  const userModel = require("./models/userModel");
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "data svae successfully" });
});

app.put("/update", async (req, res) => {
  const userModel = require("./models/userModel");
  const { _id, name, email, mobile } = req.body;
  const data = await userModel.updateOne({ _id: _id }, { name, email, mobile });
  if (data) {
    res.send({ success: true, message: "Data updated successfully" });
  } else {
    res.send({ success: false, message: "Data not updated successfully" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const userModel = require("./models/userModel");
  const id = req.params.id;
  const data = await userModel.deleteOne({ _id: id });

  if (data) {
    res.send({ success: true, message: "Data updated successfully" });
  } else {
    res.send({ success: false, message: "Data not updated successfully" });
  }
});

app.use("/auth", userLoginRoute);

app.listen(PORT, () => {
  console.log(`Listning Port: ${PORT}`);
});
