const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return respondWithUnauthorized(res);
    }

    try {
      const checkToken = jwt.verify(token, process.env.SECRET_KEY);

      if (!checkToken.id) {
        return respondWithUnauthorized(res);
      }

      const user = await userModel
        .findById(checkToken.id)
        .select('-password');

      if (!user) {
        return respondWithUnauthorized(res);
      }

      req.user = user;

      return next();
    } catch (error) {
      return respondWithUnauthorized(res);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

const respondWithUnauthorized = res => res
  .status(401)
  .json({ error: 'Unauthorized' });

module.exports = auth;
