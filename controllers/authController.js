const jwt = require("jsonwebtoken");
// const { nanoid } = require("nanoid");
const EmailSender = require("../utils/sendEmail");
var _ = require("lodash");
require("dotenv").config();

const User = require("./../models/userModel");

exports.signup = async (req, res) => {
  const { name, email, password, profile_pic, address, pharmacyName, number } =
    req.body;

  /*--------Find exest user--------*/
  const exestUser = await User.findOne({ email });
  if (exestUser) return res.status(400).json({ error: "Email alredy taken" });

  /*--------Find exest user and Save--------*/
  const newUser = new User({
    name,
    email,
    password,
    profile_pic,
    address,
    pharmacyName,
    number,
  });
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.status(201).json({
      message: "Singup Successfull ! Please signin",
    });
  });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  //email and password match
  if (!user.authenticate(password)) {
    return res.status(400).json({ error: "Email and password don't match!" });
  }

  user.hased_password= undefined
  user.salt= undefined
  user.resetPasswordLink= undefined


  //carete token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token, user });
};

exports.requireSignIn = async (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken) return res.status(400).json({ error: "Please Log In" });
  const bearer = authToken.split(" ");
  const token = bearer[1];
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      return res.status(400).json({ error: "Please Log In" });
    }
    if (decoded) {
      const user = await User.findById(decoded._id).select([
        "name",
        "profile_pic",
        "email",
        "role",
      ]);
      req.user = user;
      next();
    }
  });
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: "p1@gmail.com",
      resetPasswordLink: req.body.otp,
    });
    if (!user) {
      return res.status(400).json({ message: "Wrong otp" });
    }
    const updatedFild = {
      password: req.body.password,
      resetPasswordLink: "",
    };
    const newUser = _.extend(user, updatedFild);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.status(201).json({
        message: true,
      });
    });
  } catch (e) {
    res.status(400).json({ message: "Try again!" });
  }
};

exports.validToken = (req, res) => {
  const authToken = req.headers["authorization"];
  if (!authToken) return res.status(400).json({ error: "Access Denide" });
  const bearer = authToken.split(" ");
  const token = bearer[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) return res.status(400).json({ error: "Access Denide" });
    if (decoded) return res.status(200).json({ msg: "ok" });
  });
};

exports.checkAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Please Log In" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denide" });
  }
  next();
};

exports.sendForgetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(403).json({ error: "Provide Valid Email" });
    const code = 9087;
    const updateCodeDB = await User.findOneAndUpdate(
      { email: email },
      { resetPasswordLink: code }
    );
    await EmailSender.sendMessage(
      "programmer.anamul@gmail.com",
      "programmer.anamul@gmail.com",
      "Password Recovery Code",
      `<div>
              <p>Password Recovery Code <span style={color: "red"}><b>${code}</b></span></p>
              </div>`
    );
    res
      .status(200)
      .json({ message: "Verfication code send on email", email: email });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Fail to send code" });
  }
};

exports.setNewPassword = async (req, res) => {
  try {
    const { code, email, password } = req.body;
    if ((!code, !email, !password))
      return res.status(400).json({ error: "Incorrect Verification Code" });

    const user = await User.findOne({
      email: email,
      resetPasswordLink: code,
    });

    if (!user) return res.status(400).json({ message: "Wrong otp" });

    const updatedFild = {
      password: password,
      resetPasswordLink: "",
    };

    const newUser = _.extend(user, updatedFild);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.status(201).json({
        message: true,
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Try Again" });
  }
};
