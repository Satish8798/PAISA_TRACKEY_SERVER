const { addTransaction, getAllTransactions,deleteTransaction } = require("../modules/transactionModule");

const router = require("express").Router();

router.post('/add',addTransaction);
router.get('/get/all/:userId',getAllTransactions)
router.delete('/delete/:id',deleteTransaction);

module.exports = router;