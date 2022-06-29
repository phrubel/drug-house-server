const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model("Company", companySchema)