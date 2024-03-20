require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
//logger
const logger = require('morgan');
app.use(logger("dev"))
//routes
app.use("/",require("./routes/indexRoutes"))

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.error("Error starting server:", error);
    } else {
        console.log(`Server listening on port ${process.env.PORT}`);
    }
});

