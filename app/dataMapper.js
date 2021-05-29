const database = require('./database');

const dataMapper = {

  getAllCards: function (callback) {
    const query = {
      text: `SELECT * FROM "card"`
    };
    database.query(query, callback);
  },

  getCard: (id, callback) => {
    const preparedQuery = {
      text: 'SELECT * FROM card WHERE card.id=$1',
      values: [id]
    };

    database.query(preparedQuery, (error, result) => {
      if (error) {
        callback(error);
      } else {
        if (result.rows.length > 0) {
          const card = result.rows[0];
          callback(null, card);
        } else {
          callback(`Card d'id ${id} inexistante`);
        }
      }
    })
  },

  searchCardWithElement: (element, cardCallback) => {
    let query;
    if (element === 'null')
    query = {
      text: `SELECT * FROM "card" WHERE "element" IS NULL`
    };
    else 
    query = {
      text : `SELECT * FROM "card" WHERE "element"=$1`,
        values: [element]
    }
    
    database.query(query, (error, result) => {
      if (error) {
        cardCallback(error)
      } else {
        const elementFind = result.rows;
        cardCallback(null, elementFind)
      }
    })
  },

  searchCardWithLevel: (level, callback) => {
    database.query('SELECT * FROM card WHERE level=$1', [level], (error, result) => {
      if (error) {
        callback(error)
      } else {
        callback(null, result.rows)
      }
    })
  },

  searchCardWithValue: (direction, value, callback) => {
    const query = {
      text : `SELECT * FROM "card" WHERE 
      $1 = 'north' AND value_north >= $2
      OR $1 = 'south' AND value_south >= $2
      OR $1 = 'east' AND value_east >= $2
      OR $1 = 'west' AND value_west >= $2`,
      values: [direction, value]
    };
    
    database.query(query, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(null, result.rows);
      }
    })
  },

  searchWithName: (name, callback) => {
    database.query('SELECT * FROM card WHERE name ILIKE $1', [`%${name}%`], (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(null, result.rows);
      }
    })
  }


};


module.exports = dataMapper;