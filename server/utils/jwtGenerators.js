const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  createAccessToken: (user_id) => {
    const payload = {
      user: user_id,
    };
    const ats = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign(payload, ats, { expiresIn: '1m' });
    return accessToken;
  },
  createRefreshToken: (user_id, token_version) => {
    const payload = {
      user: user_id,
      version: token_version,
    };
    const rts = process.env.REFRESH_TOKEN_SECRET;
    const refreshToken = jwt.sign(payload, rts, { expiresIn: '7d' });
    return refreshToken;
  },
};
