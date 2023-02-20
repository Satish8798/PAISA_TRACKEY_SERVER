const mongoose = require("mongoose");

module.exports = {
    connect: async function (){
        try {
            await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
            console.log("db connected")
        } catch (error) {
            console.log(error);
        }
    }
}