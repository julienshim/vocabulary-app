const router = require('express').Router();
const pool = require('../config/keys');
const authorization = require('../middlewares/authorization');

router.get('/', authorization, async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      req.user,
    ]);
    const { user_name, user_username } = user.rows[0];
    res.send({ user_name, user_username });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
