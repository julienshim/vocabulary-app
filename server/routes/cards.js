const router = require('express').Router();

const pool = require('../config/keys');
const paginatedResults = require('../middlewares/paginatedResults');

router.post('/add', async (req, res) => {
  try {
    const { korean, english, hanja, onMaster } = req.body;
    const newCard = await pool.query(
      'INSERT INTO cards (korean, english, hanja, onMaster) VALUES($1, $2, $3, $4) RETURNING *',
      [korean, english, hanja, Boolean(onMaster)]
    );
    res.send(newCard.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/', paginatedResults('cards'), async (req, res) => {
  res.json(res.paginatedResults);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const card = await pool.query('SELECT * FROM cards WHERE card_id = $1', [
      id,
    ]);
    res.json(card);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { korean, english, hanja, onMaster } = req.body;
    const updateCard = await pool.query(
      'UPDATE cards SET korean = $1, english = $2, hanja = $3, onMaster = $4 WHERE card_id = $5 RETURNING *',
      [korean, english, hanja, Boolean(onMaster), id]
    );
    res.json(updateCard.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      'DELETE FROM cards WHERE card_id = $1 RETURNING *',
      [id]
    );
    res.json(`${deleteTodo.rows[0].korean} card was deleted.`);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
