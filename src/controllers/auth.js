const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const auth = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials' });
    }

    const checkPassword = await user.checkPassword(req.body.password);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    const userData = { ...user._doc };
    delete userData.password;

    return res.json({ user: userData, token });
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

module.exports = {
  auth,
};
