const jwt = require('jsonwebtoken');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const User = require('../models/user');

exports.signupUser = async (req, res) => {
  const salt = genSaltSync(10);
  req.body.password = hashSync(req.body.password, salt);
  let user = new User(req.body);
  const { username } = req.body;
  try {
    const userCheck = await User.findOne({ username }, 'username password');
    if (userCheck) {
      res.status(500).json({ status: 500, message: 'username already taken' });
    } else {
      user = await user.save();
      res.status(200).json({ status: 200, message: 'success', data: user });
    }
  } catch (err) {
    console.log(err.message);
    res.status(err.status).json({ status: err.status, message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userCheck = await User.findOne({ username }, 'username password');
    if (!userCheck) {
      return res.status(401).json({ status: 401, message: 'Incorrect username or Password' });
    }
    const user = compareSync(password, userCheck.password);
    if (user) {
      userCheck.password = undefined;
      const jsontoken = jwt.sign({ user: userCheck }, process.env.SECRET, { expiresIn: '1h' });
      user.token = jsontoken;
      return res.status(200).json({ status: 200, message: 'login successful', token: jsontoken });
    }
    return res.status(400).json({ status: 400, message: 'Invalid username or password' });
  } catch (err) {
    return res.status(err.status).json({ status: err.status, message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: 200, message: 'success', data: users });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ status: err.status, message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ status: 200, message: 'success', data: user });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ status: err.status, message: err.message });
  }
};
