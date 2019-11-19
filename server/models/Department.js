const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Department name is required",
      trim: true,
      lowercase: true
    }
  },
  { timestamps: true }
);

module.exports = Department = mongoose.model("Department", departmentSchema);
