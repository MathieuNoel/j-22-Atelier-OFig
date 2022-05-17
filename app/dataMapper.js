const client = require('./database');

const dataMapper = {

  async getAllFigurines() {
    const sqlQuery = `SELECT * FROM "figurine"`;
    const results = await client.query(sqlQuery);
    return results.rows;
  },

  async getOneFigurine(id) {
    const sqlQuery = `SELECT * FROM "figurine" WHERE "id" = $1`;
    const results = await client.query(sqlQuery, [id]);
    return results.rows[0];
  },

};

module.exports = dataMapper;