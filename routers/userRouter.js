const { signup, login } = require("../modules/userModule");

const router = require("express").Router();

router.post('/login',login);
router.post('/signup',signup);

module.exports = router;