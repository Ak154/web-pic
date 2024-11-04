const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use("/api/users", userRoutes);

let port = process.env.PORT || 5000;


app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`)
})