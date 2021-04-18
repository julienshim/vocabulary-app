const router = require('express').Router();

// const pool = require('../config/keys');
const paginatedResults = require('../middlewares/paginatedResults');

router.get('/', paginatedResults('cards'), async (req, res) => {
  res.json(res.paginatedResults);
});

module.exports = router;
