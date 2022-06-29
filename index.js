const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const authRoute  = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const companyRoute = require("./routes/companyRoute")
const orderRoute = require("./routes/order")

app.use(express.json());
app.use(cors());

app.use("/", authRoute);
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", companyRoute);
app.use("/api", orderRoute);


mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("database connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
    res.send("Welcome to our back end")
})

app.listen(process.env.PORT || 8000, () => console.log("App is running"));
