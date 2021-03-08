const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const authorization = req.header('Authorization');
    const token = authorization.split(' ')[1];
    if (!authorization) {
      return res.sendStatus(401);
    }
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload.user;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
