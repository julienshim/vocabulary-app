const router = require('express').Router();
const pool = require('../config/keys');
const authorization = require('../middlewares/authorization');

router.get('/', authorization, async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      req.user,
    ]);
    res.json(user.rows[0].user_name);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
