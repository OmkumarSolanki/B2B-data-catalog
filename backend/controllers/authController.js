const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { emit } = require('../app');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ result: 'User already exists' });
    }

    user = new User({
      username,
      password,
      email,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ result: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ result: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ result: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
    console.log("Login Successfully");
    jwt.sign(payload, 'jwtsecret1', { expiresIn: 3600 }, (err, token) => { // 1 hr expiry
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};