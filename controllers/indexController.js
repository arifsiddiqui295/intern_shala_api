const {
  catchAsyncErros,
} = require("../middlewares/catchAsyncErrors");
const student = require("../models/studentModel");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
exports.homepage = catchAsyncErros(async (req, res, next) => {
  res.json({ message: "homepage" });
});
exports.studentSignup = catchAsyncErros(async (req, res, next) => {
  // res.json(req.body);
  const student = await new Student(req.body).save();
  res.status(201).json(student);
});
exports.studentSignin = catchAsyncErros(async (req, res, next) => {
  // res.json(req.body);
  const student = await Student.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!student) {
    return res.status(401).json({ message: "Student not found with this email address" });
  }
    const isMatch = student.comparepassword(req.body.password);
    if (!isMatch) {
      return next(new ErrorHandler("wrong password"),500)
    }
    
  res.json(student);
});
exports.studentSignout = catchAsyncErros(async (req, res, next) => {});
