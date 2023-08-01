require("dotenv").config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const stockItemRoutes = require("./routes/stockItems.js")
const userRoutes = require("./routes/user.js")
const healthReportRoutes = require("./routes/healthReports.js")
const tempUserRoutes = require("./routes/tempUser.js")

const app = express(); //starts app
const cors = require("cors");


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/stock', stockItemRoutes);
app.use('/user',userRoutes);
app.use('/tempuser',tempUserRoutes);
app.use('/healthandsafety',healthReportRoutes);


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,() =>{
            console.log('listening on port',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

    