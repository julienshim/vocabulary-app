const pool = require("../config/keys");

const router = require("express").Router();

router.post("/add", async (req, res) => {
  try {
    const {deck, korean, english, hanja, onMaster} = req.body;
    const newCard = await pool.query("INSERT INTO cards (deck, korean, english, hanja, onMaster) VALUES($1, $2, $3, $4, $5) RETURNING *", 
      [Number(deck), korean, english, hanja, Boolean(onMaster)])
    res.send(newCard.rows[0])
  } catch (err) {
    console.error(err.message)
  }
});

router.get("/", async(req, res) => {
  try {
    const allCards = await pool.query("SELECT * FROM cards ORDER BY card_id");
    res.json(allCards.rows)
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const card = await pool.query("SELECT * FROM cards WHERE card_id = $1", [id])
    res.json(card)
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {deck, korean, english, hanja, onMaster} = req.body;
    const updateCard = await pool.query("UPDATE cards SET deck = $1, korean = $2, english = $3, hanja = $4, onMaster = $5 WHERE card_id = $6 RETURNING *", [Number(deck), korean, english, hanja, Boolean(onMaster), id])
    res.json(updateCard.rows[0])
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE FROM cards WHERE card_id = $1 RETURNING *", [id])
    res.json(`${deleteTodo.rows[0].korean} card was deleted.`)
  } catch (err) {
    console.error(err.message)
  }
});


module.exports = router;
