require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
//db connection
require('./models/database').connectDatabase()
//logger
const logger = require('morgan');
app.use(logger("dev"))
//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
//error handeling 
const { generatedErros } = require("./middlewares/error");
const ErrorHandler = require("./utils/errorHandler");

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

