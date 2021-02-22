const pool = require("../config/keys");

module.exports = {
    paginatedResults: function (model) {
        return async (req, res, next) => {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
          
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
    
            const results = {};

            const cardCount = await pool.query(`SELECT COUNT(*) FROM ${model}`)

            if(endIndex < cardCount.rows[0].count) {
                results.next = {
                  page: page + 1,
                  limit: limit
                }
              }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            try {
                const allCards = await pool.query(`SELECT * FROM ${model} ORDER BY card_id LIMIT ${limit} OFFSET ${startIndex}`);
                results.results= allCards.rows;
                res.paginatedResults = results;
                next()
            } catch(err) {
                res.status(500).json({message: err.message})
            }

        }
    }
}