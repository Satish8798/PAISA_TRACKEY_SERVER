const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailExists = await userModel.findOne({ email: email });

    if (emailExists) {
      throw new Error("Email aready exists");
    }

    const randomStraing = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, randomStraing);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    if (savedUser) {
      return res.status(200).send(true);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("Account does not exist");
    }
    const passwordMatching = await bcrypt.compare(password, user.password);

    if (!passwordMatching) {
      throw new Error("password incorrect");
    }

    res.status(200).send({
      name: user.name,
      email: user.email,
      _id: user._id,
      balance: user.balance,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { name, email, id } = req.body;
    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      { email:email, name:name },
      { returnDocument: "after" }
    );

    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error.message);
  }
};
