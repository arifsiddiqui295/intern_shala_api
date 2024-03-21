const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const studentModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      maxLength: [15, "Pass should not exceed 15 characters"],
      minLength: [6, "Pass should be atleast 6 characters"],
      // match[]
    },
  },
  { timestamps: true }
);

studentModel.pre("save", async function (next) {
    if(!this.isModified("password")) {
        return;
    }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
studentModel.methods.comparepassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

const student = mongoose.model("student", studentModel);
module.exports = student;
