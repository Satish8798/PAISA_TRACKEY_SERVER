const { addTransaction, getAllTransactions,deleteTransaction } = require("../modules/transactionModule");
const {verifyToken} = require("../modules/authModule");

const router = require("express").Router();

router.post('/add',verifyToken,addTransaction);
router.get('/get/all/:userId',verifyToken,getAllTransactions)
router.delete('/delete/:id',verifyToken,deleteTransaction);

module.exports = router;