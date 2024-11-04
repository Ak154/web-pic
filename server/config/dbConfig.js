const mongoose = require("mongoose");

const connect = mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", ()=>{
    console.log("Database connected successfully!");
})

connection.on("Error", (error)=>{
    console.log("Error in database connection!", error);
})