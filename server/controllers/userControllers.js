const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    let isUser = await User.findOne({ email: req.body.email });
    if (isUser) {
      return res
        .status(200)
        .send({ message: "User already exist", success: false });
    }

    let newUser = new User(req.body);
    newUser.profile_pic = req.file.filename;
    await newUser.save();

    res
      .status(201)
      .send({ message: "Registration is successfull", success: true });
  } catch (error) {
    return res.status(500).send({ message: "Error in user registration", success: false, error })
  }
};

exports.login = async (req, res) => {};
