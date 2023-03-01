const { verifyToken } = require("../modules/authModule");
const { signup, login, update } = require("../modules/userModule");

const router = require("express").Router();

router.post('/login',login);
router.post('/signup',signup);
router.put('/update',verifyToken,update);

module.exports = router;