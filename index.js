const express = require('express');
const dotenv = require('dotenv');
const dbConnection = require("./dbConnection");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const transactionRouter = require("./routers/transactionRouter");
const donationRouter = require("./routers/donationRouter");

const app = express();

dotenv.config();

dbConnection.connect();
app.use(express.json());

app.use(cors());

app.use('/user',userRouter);
app.use('/transaction/',transactionRouter);
app.use('/donation',donationRouter);

app.listen(process.env.PORT,()=>{
    console.log("server started")
})