const userModel = require('../models/user');

const list = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .select('-password')
      .sort({ createdAt: -1 });

    return res.json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

const store = async (req, res) => {
  try {
    const checkEmail = await userModel
      .find({ email: new RegExp(req.body.email, '') })
      .countDocuments();

    if (checkEmail > 0) {
      return res
        .status(400)
        .json({ error: 'User already exists.' });
    }

    const newUser = await userModel.create(req.body);

    const user = { ...newUser._doc };
    delete user.password;

    return res.json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

const update = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    const user = { ...updatedUser._doc };
    delete user.password;

    return res.json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

const destroy = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);

    return res.json({});
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

module.exports = {
  list,
  store,
  update,
  destroy,
};
