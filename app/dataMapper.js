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

  searchCardWithElement: (cardCallback) => {
    const preparedQuery = {
      text: 'SELECT * FROM card WHERE card.element=$1',
      values: [element]
    }
    database.query(preparedQuery, (error, result) => {
      if (error) {
        cardCallback(error)
      } else {
        const elementFind = result.rows;
        cardCallback(null, elementFind)
      }
    })
  }


};


module.exports = dataMapper;