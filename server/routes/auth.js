const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../config/keys');
const {
  createAccessToken,
  createRefreshToken,
} = require('../utils/jwtGenerators');
const validateUserInfo = require('../middlewares/validateUserInfo');
const { sendRefreshToken } = require('../utils/sendRefreshToken');
const authorization = require('../middlewares/authorization');

router.post('/register', validateUserInfo, async (req, res) => {
  try {
    // 1. descture the req.body {email, name, password};
    const { email, name, username, password } = req.body;

    // 2. check if user email and username exists. if yes throw error.
    const queryEmail = await pool.query(
      'SELECT * FROM users WHERE user_email = $1',
      [email]
    );

    const queryUsername = await pool.query(
      'SELECT * FROM users where user_username = $1',
      [username]
    );

    if (queryEmail.rows.length > 0 && queryUsername.rows.length > 0) {
      return res.status(409).send({ errorMessage: '2' });
    }

    if (queryEmail.rows.length > 0) {
      return res.status(409).send({ errorMessage: '0' });
    }

    if (queryUsername.rows.length > 0) {
      return res.status(409).send({ errorMessage: '1' });
    }

    // 3. bcrypt the user password

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter the new user into users table

    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_username, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, username, email, bcryptPassword]
    );

    // 5. generat jwt token
    const { token_version, user_id } = newUser.rows[0];
    const accessToken = createAccessToken(user_id);
    const refreshToken = createRefreshToken(user_id, token_version);
    sendRefreshToken(res, refreshToken);
    res.json({ accessToken });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post('/login', validateUserInfo, async (req, res) => {
  try {
    // 1. destructure req.body
    const { email, password } = req.body;
    // 2. check if use rdoesn't exist. if not throw error
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.sendStatus(401);
    }
    // 3. check if incoming passowrd is the same as user table password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.sendStatus(401);
    }
    // 4. give jwt token

    const { token_version, user_id } = user.rows[0];
    const accessToken = createAccessToken(user_id);
    const refreshToken = createRefreshToken(user_id, token_version);

    // eslint-disable-next-line no-console
    sendRefreshToken(res, refreshToken);
    res.json({ accessToken });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.delete('/logout', validateUserInfo, async (req, res) => {
  try {
    sendRefreshToken(res, '');
    res.send({ accessToken: '' });
  } catch (err) {
    res.sendState(500);
  }
});

router.get('/is-verified', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
