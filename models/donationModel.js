const mongoose = require("mongoose");
const model = mongoose.model;
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    donationAmount:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        required: true
    },
      user: {
        type: mongoose.ObjectId,
        ref: "users"
      }
});

const donationModel = model("donations",donationSchema);

module.exports = donationModel;
