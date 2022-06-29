const User = require("../models/userModel");

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find({}).select([
      "-hased_password",
      "-salt",
      "-resetPasswordLink",
    ]);
    user.reverse()
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: "Something Worng!" });
  }
};

exports.deletUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByIdAndRemove(userId);
    res.status(201).json({ message: "Delet Successfuly!" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Something Worng!" });
  }
};
