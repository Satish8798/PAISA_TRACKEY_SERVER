const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userModel");

module.exports.addTransaction = async (req, res) => {
  let { amount, name, description, isCredit, user } = req.body;
  amount = parseFloat(amount).toFixed(2);
  try {
    if(isCredit){
        const userUpdate = await userModel.findByIdAndUpdate({_id:user},{$inc:{balance: amount}});
    }else{
        const userUpdate = await userModel.findByIdAndUpdate({_id:user},{$inc:{balance: -amount}})
    }

    const transaction = new transactionModel({
        amount,
        name,
        description,isCredit,user,
        date: new Date()
    });

    let savedTransaction = await transaction.save();

    savedTransaction = await savedTransaction.populate("user","_id name email balance");

    res.status(200).send(savedTransaction)

  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports.getAllTransactions = async (req,res) =>{
    let {userId} = req.params;
    try {
        const transactions = await transactionModel.find({user:userId});
        res.status(200).send(transactions);
    } catch (error) {
    res.status(400).send(error.message);
    }
}

module.exports.deleteTransaction = async (req,res) =>{
    let {id} = req.params;
    try {
        const transaction = await transactionModel.findByIdAndRemove({_id:id})
        let user = null;
        if(transaction.isCredit){
         
         user = await userModel.findByIdAndUpdate({_id:transaction.user},{$inc:{balance: -transaction.amount}},{returnDocument: 'after'})
        }else{
            user = await userModel.findByIdAndUpdate({_id:transaction.user},{$inc:{balance: transaction.amount}},{returnDocument: 'after'})
        }
        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            balance: user.balance
        });

    } catch (error) {
    res.status(400).send(error.message);
    }
}
