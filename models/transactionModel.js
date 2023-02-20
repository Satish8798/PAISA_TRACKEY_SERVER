const mongoose = require("mongoose");
const model = mongoose.model;
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    amount:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        required: true
    },
    name: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 30,
        required: true,
      },
      description: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 100,
        required: true,
      },
      user: {
        type: mongoose.ObjectId,
        ref: "users"
      },
      isCredit: {
        type:Boolean,
        required:true
      }
});

const transactionModel = model("transactions",transactionSchema);

module.exports = transactionModel;
