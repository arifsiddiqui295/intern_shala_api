require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
//logger
const logger = require('morgan');
const { generatedErros } = require("./middlewares/error");
const ErrorHandler = require("./utils/errorHandler");
app.use(logger("dev"))
//routes
app.use("/",require("./routes/indexRoutes"))
//error handeling
app.all("*",(req,res,next) => {
    next(new ErrorHandler(`Request Url not found: ${req.url}`,404))
})
app.use(generatedErros)
app.listen(process.env.PORT, (error) => {
    if (error) {
        console.error("Error starting server:", error);
    } else {
        console.log(`Server listening on port ${process.env.PORT}`);
    }
});

