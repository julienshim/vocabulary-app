const router = require('express').Router();

const pool = require('../config/keys');
const middlewares = require('../middlewares/middlewares');

router.post('/add', async (req, res) => {
  try {
    const { deck, korean, english, hanja, onMaster } = req.body;
    const newCard = await pool.query(
      'INSERT INTO cards (deck, korean, english, hanja, onMaster) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [Number(deck), korean, english, hanja, Boolean(onMaster)]
    );
    res.send(newCard.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', middlewares.paginatedResults('cards'), async (req, res) => {
  res.json(res.paginatedResults);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const card = await pool.query('SELECT * FROM cards WHERE cardId = $1', [
      id,
    ]);
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { deck, korean, english, hanja, onMaster } = req.body;
    const updateCard = await pool.query(
      'UPDATE cards SET deck = $1, korean = $2, english = $3, hanja = $4, onMaster = $5 WHERE cardId = $6 RETURNING *',
      [Number(deck), korean, english, hanja, Boolean(onMaster), id]
    );
    res.json(updateCard.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      'DELETE FROM cards WHERE cardId = $1 RETURNING *',
      [id]
    );
    res.json(`${deleteTodo.rows[0].korean} card was deleted.`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
